import os, json
import numpy as np
import pandas as pd
from joblib import load
import shap
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

#image 
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import io
from fastapi import UploadFile, File, HTTPException

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ART_DIR = os.path.join(BASE_DIR, "artifacts")
app = FastAPI(title="PCOSmart Text ML Service", version="1.0")


image_torch_model = None
image_transform = None
IMAGE_DEVICE = "cpu"   # keep CPU for Windows reliability


# CORS (allow your React/Node to call it)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Globals loaded at startup ----
simple_pipe = None
clinical_pipe = None
simple_schema = None
clinical_schema = None
risk_thresholds = None

simple_explainer = None
clinical_explainer = None
simple_feature_names = None
clinical_feature_names = None

# ---- Helpers ----
def risk_level(p: float) -> str:
    if p < risk_thresholds["low_max"]:
        return "Low"
    elif p < risk_thresholds["medium_max"]:
        return "Medium"
    return "High"

def clean_feat_name(name: str) -> str:
    # Make SHAP names look less ugly: "num__bmi" -> "bmi", "cat__cycle_r_i_4" -> "cycle_r_i=4"
    name = str(name)
    name = name.replace("num__", "").replace("cat__", "")
    if "cycle_r_i_" in name:
        # ex: cycle_r_i_4
        parts = name.split("cycle_r_i_")
        if len(parts) == 2:
            name = f"cycle_r_i={parts[1]}"
    return name

def make_shap_explainer(pipeline, background_df: pd.DataFrame):
    preprocess = pipeline.named_steps["preprocess"]
    model = pipeline.named_steps["clf"]

    bg_t = preprocess.transform(background_df)

    try:
        feature_names = preprocess.get_feature_names_out()
    except Exception:
        feature_names = [f"f{i}" for i in range(bg_t.shape[1])]

    explainer = shap.Explainer(model, bg_t, feature_names=feature_names)
    return explainer, feature_names

def top_factors_from_shap(shap_values_row, feature_names, top_k=6):
    vals = np.array(shap_values_row)
    idx = np.argsort(np.abs(vals))[::-1][:top_k]

    out = []
    for i in idx:
        impact = float(vals[i])
        out.append({
            "feature": clean_feat_name(feature_names[i]),
            "impact": impact,
            "direction": "increases_risk" if impact > 0 else "decreases_risk",
        })
    return out

def predict_and_explain(pipeline, explainer, feature_names, schema_features, payload: dict, top_k=6):
    # Build row in the exact schema order
    row = {f: payload.get(f, None) for f in schema_features}
    x_df = pd.DataFrame([row])

    # IMPORTANT: cycle_r_i should be string "2"/"4"
    if "cycle_r_i" in x_df.columns:
        x_df["cycle_r_i"] = x_df["cycle_r_i"].astype(str)

    proba = float(pipeline.predict_proba(x_df)[:, 1][0])

    x_t = pipeline.named_steps["preprocess"].transform(x_df)
    shap_exp = explainer(x_t)
    shap_vals = shap_exp.values[0]

    top = top_factors_from_shap(shap_vals, feature_names, top_k=top_k)

    return proba, top

def gemini_narration(probability: float, top_factors: list, mode: str) -> str:
    lvl = risk_level(probability)
    factors_text = "\n".join([f"- {f['feature']}: {f['direction']}" for f in top_factors])

    prompt = f"""
You are a health education assistant. Do NOT diagnose.
Explain a PCOS risk screening result in simple language.

Mode: {mode}
Risk probability: {probability:.2f} (Risk level: {lvl})

Top contributing factors (from explainable AI):
{factors_text}

Write 5-8 lines:
- Explain this is a screening estimate, not diagnosis
- Mention the main factors simply
- Suggest consulting a clinician for confirmation
- Avoid medicines/prescriptions
"""

    model = genai.GenerativeModel("models/gemini-flash-latest")
    resp = model.generate_content(prompt)
    return (resp.text or "").strip()


def build_resnet18_2class():
    m = models.resnet18(weights=None)  # no download
    num_ftrs = m.fc.in_features
    m.fc = nn.Linear(num_ftrs, 2)
    return m


def gemini_narration_image(probability: float) -> str:
    lvl = risk_level(probability)

    prompt = f"""
You are a health education assistant. Do NOT diagnose.
Explain a PCOS screening result based on ultrasound image analysis.

Risk probability: {probability:.2f} (Risk level: {lvl})

Write 5-8 lines:
- Explain this is a screening estimate, not diagnosis
- Suggest consulting a clinician for confirmation
- Avoid medicines/prescriptions
"""
    model = genai.GenerativeModel("models/gemini-flash-latest")
    resp = model.generate_content(prompt)
    return (resp.text or "").strip()

# ---- Startup ----
@app.on_event("startup")
def startup():
    global simple_pipe, clinical_pipe
    global simple_schema, clinical_schema, risk_thresholds
    global simple_explainer, clinical_explainer, simple_feature_names, clinical_feature_names
    global image_torch_model, image_transform
    

    # Configure Gemini
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set")
    genai.configure(api_key=api_key)

    # Load models
    simple_pipe = load(os.path.join(ART_DIR, "pcos_simple_pipeline.joblib"))
    clinical_pipe = load(os.path.join(ART_DIR, "pcos_clinical_pipeline.joblib"))

    # Load schemas
    with open(os.path.join(ART_DIR, "simple_schema.json")) as f:
        simple_schema = json.load(f)["features"]
    with open(os.path.join(ART_DIR, "clinical_schema.json")) as f:
        clinical_schema = json.load(f)["features"]

    # Load thresholds
    with open(os.path.join(ART_DIR, "risk_thresholds.json")) as f:
        risk_thresholds = json.load(f)

    # Load SHAP backgrounds
    simple_bg = pd.read_csv(os.path.join(ART_DIR, "simple_shap_background.csv"))
    clinical_bg = pd.read_csv(os.path.join(ART_DIR, "clinical_shap_background.csv"))

    # Build explainers
    simple_explainer, simple_feature_names = make_shap_explainer(simple_pipe, simple_bg)
    clinical_explainer, clinical_feature_names = make_shap_explainer(clinical_pipe, clinical_bg)

    pt_path = os.path.join(ART_DIR, "pcos_resnet_model.pt")
    if not os.path.exists(pt_path):
        raise RuntimeError(f"pcos_resnet_model.pt not found at: {pt_path}")

    image_torch_model = build_resnet18_2class().to(IMAGE_DEVICE)
    state = torch.load(pt_path, map_location=IMAGE_DEVICE)
    image_torch_model.load_state_dict(state)
    image_torch_model.eval()

    image_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict/simple")
def predict_simple(payload: dict):
    p, top = predict_and_explain(
        simple_pipe, simple_explainer, simple_feature_names,
        simple_schema, payload, top_k=6
    )
    narration = gemini_narration(p, top, mode="simple")
    return {
        "probability": p,
        "risk_level": risk_level(p),
        "top_factors": top,
        "narration": narration
    }

@app.post("/predict/clinical")
def predict_clinical(payload: dict):
    p, top = predict_and_explain(
        clinical_pipe, clinical_explainer, clinical_feature_names,
        clinical_schema, payload, top_k=6
    )
    narration = gemini_narration(p, top, mode="clinical")
    return {
        "probability": p,
        "risk_level": risk_level(p),
        "top_factors": top,
        "narration": narration
    }


@app.post("/predict/image")
async def predict_image(image: UploadFile = File(...)):
    if image_torch_model is None or image_transform is None:
        raise HTTPException(status_code=500, detail="Image model not loaded")

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    contents = await image.read()
    try:
        pil_img = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    x = image_transform(pil_img).unsqueeze(0).to(IMAGE_DEVICE)  # [1,3,224,224]

    with torch.no_grad():
        logits = image_torch_model(x)          # [1,2]
        probs = F.softmax(logits, dim=1)       # [1,2]
        p_pcos = float(probs[0, 1].item())     # index 1 = PCOS (must match training)

    narration = gemini_narration_image(p_pcos)

    return {
        "probability": p_pcos,
        "risk_level": risk_level(p_pcos),
        "top_factors": [],
        "narration": narration,
    }