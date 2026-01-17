const axios = require("axios");
const SimpleDataTest = require("../models/SimpleDataTest"); 
const ClinicalDataTest = require("../models/ClinicalDataTest"); 
const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

// Helper: convert boolean-ish values to 0/1 
const to01 = (v) => {
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "number") return v ? 1 : 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1", "true", "yes", "y"].includes(s)) return 1;
    if (["0", "false", "no", "n"].includes(s)) return 0;
  }
  return v ? 1 : 0;
};


// Takes simple form data from frontend, saves it, sends payload to ML service, returns ML output.

const sendDataToSimpleTextModel = async (req, res) => {
  console.log("req.user =", req.user);
  try {
    const {
      age,
      bmi,
      pulseRate,
      respiratoryRate,
      hemoglobin,
      menstrualCycleType, // 2 or 4
      averageCycleLength,
      weightGain,
      hairGrowth,
      skinDarkening,
      hairLoss,
      pimples,
      fastFood,
      regularExercise,
      bpSystolic,
      bpDiastolic,
    } = req.body;

    const required = {
      age,
      bmi,
      pulseRate,
      respiratoryRate,
      hemoglobin,
      menstrualCycleType,
      averageCycleLength,
      weightGain,
      hairGrowth,
      skinDarkening,
      hairLoss,
      pimples,
      fastFood,
      regularExercise,
      bpSystolic,
      bpDiastolic,
    };

    for (const [k, v] of Object.entries(required)) {
      if (v === undefined || v === null) {
        return res.status(400).json({ message: `Missing required field: ${k}` });
      }
    }

    const cycleVal = String(menstrualCycleType);
    if (!["2", "4"].includes(cycleVal)) {
      return res
        .status(400)
        .json({ message: "menstrualCycleType must be 2 (Regular) or 4 (Irregular)" });
    }

    if (!ML_SERVICE_URL) {
      return res.status(500).json({ message: "ML_SERVICE_URL not set in environment" });
    }

    // Save input in Mongo
    const saved = await SimpleDataTest.create({
      userId: req.user?._id, 
      age: Number(age),
      bmi: Number(bmi),
      pulseRate: Number(pulseRate),
      respiratoryRate: Number(respiratoryRate),
      hemoglobin: Number(hemoglobin),
      menstrualCycleType: Number(cycleVal),
      averageCycleLength: Number(averageCycleLength),
      weightGain: Boolean(to01(weightGain)),
      hairGrowth: Boolean(to01(hairGrowth)),
      skinDarkening: Boolean(to01(skinDarkening)),
      hairLoss: Boolean(to01(hairLoss)),
      pimples: Boolean(to01(pimples)),
      fastFood: Boolean(to01(fastFood)),
      regularExercise: Boolean(to01(regularExercise)),
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
    });

    // Payload for ML service
    const mlPayload = {
      age_yrs: Number(age),
      bmi: Number(bmi),
      pulse_rate_bpm: Number(pulseRate),
      rr_breaths_min: Number(respiratoryRate),
      hb_g_dl: Number(hemoglobin),
      cycle_r_i: cycleVal, // send as string "2"/"4"
      cycle_length_days: Number(averageCycleLength),
      weight_gain_y_n: to01(weightGain),
      hair_growth_y_n: to01(hairGrowth),
      skin_darkening_y_n: to01(skinDarkening),
      hair_loss_y_n: to01(hairLoss),
      pimples_y_n: to01(pimples),
      fast_food_y_n: to01(fastFood),
      reg_exercise_y_n: to01(regularExercise),
      bp_systolic_mmhg: Number(bpSystolic),
      bp_diastolic_mmhg: Number(bpDiastolic),
    };

    // Call ML
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict/simple`, mlPayload, {
      timeout: 30000,
    });

    // Save ML output
    saved.modelOutput = mlResponse.data; 
    await saved.save();

    return res.status(200).json({
      message: "Prediction completed",
      submissionId: saved._id,
      inputMode: "simple",
      mlResult: mlResponse.data,
    });
  } catch (err) {
    console.error("sendDataToSimpleTextModel error:", err?.response?.data || err.message);
    return res.status(500).json({
      message: "Failed to process simple text model request",
      error: err?.response?.data || err.message,
    });
  }
};


// Takes clinical form data from frontend, saves it, sends payload to ML service, returns ML output.

const sendDataToClinicalTextModel = async (req, res) => {
  try {
    const {
      age,
      bmi,
      pulseRate,
      respiratoryRate,
      hemoglobin,
      menstrualCycleType,
      averageCycleLength,
      weightGain,
      hairGrowth,
      skinDarkening,
      hairLoss,
      pimples,
      fastFood,
      regularExercise,
      bpSystolic,
      bpDiastolic,

      B_HCG_Test1,
      B_HCG_Test2,
      FSH,
      LH,
      FSHLH_Ratio,
      TSH,
      AMH,
      prolactin,
      vitaminD3,
      progesterone,
      randomBloodSugar,
    } = req.body;

    // For clinical, you can enforce labs required OR allow nulls.
    // Here: basic fields required, labs optional (we send nulls if missing).
    const requiredBasic = {
      age,
      bmi,
      pulseRate,
      respiratoryRate,
      hemoglobin,
      menstrualCycleType,
      averageCycleLength,
      weightGain,
      hairGrowth,
      skinDarkening,
      hairLoss,
      pimples,
      fastFood,
      regularExercise,
      bpSystolic,
      bpDiastolic,
    };

    for (const [k, v] of Object.entries(requiredBasic)) {
      if (v === undefined || v === null) {
        return res.status(400).json({ message: `Missing required field: ${k}` });
      }
    }

    const cycleVal = String(menstrualCycleType);
    if (!["2", "4"].includes(cycleVal)) {
      return res
        .status(400)
        .json({ message: "menstrualCycleType must be 2 (Regular) or 4 (Irregular)" });
    }

    if (!ML_SERVICE_URL) {
      return res.status(500).json({ message: "ML_SERVICE_URL not set in environment" });
    }

    // Save input in Mongo 
    const saved = await ClinicalDataTest.create({
      userId: req.user?._id, 
      age: Number(age),
      bmi: Number(bmi),
      pulseRate: Number(pulseRate),
      respiratoryRate: Number(respiratoryRate),
      hemoglobin: Number(hemoglobin),
      menstrualCycleType: Number(cycleVal),
      averageCycleLength: Number(averageCycleLength),

      weightGain: Boolean(to01(weightGain)),
      hairGrowth: Boolean(to01(hairGrowth)),
      skinDarkening: Boolean(to01(skinDarkening)),
      hairLoss: Boolean(to01(hairLoss)),
      pimples: Boolean(to01(pimples)),
      fastFood: Boolean(to01(fastFood)),
      regularExercise: Boolean(to01(regularExercise)),

      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),

      // labs 
      betaHcg1: B_HCG_Test1 !== undefined && B_HCG_Test1 !== null ? Number(B_HCG_Test1) : null,
      betaHcg2: B_HCG_Test2 !== undefined && B_HCG_Test2 !== null ? Number(B_HCG_Test2) : null,
      fsh: FSH !== undefined && FSH !== null ? Number(FSH) : null,
      lh: LH !== undefined && LH !== null ? Number(LH) : null,
      fshLhRatio: FSHLH_Ratio !== undefined && FSHLH_Ratio !== null ? Number(FSHLH_Ratio) : null,
      tsh: TSH !== undefined && TSH !== null ? Number(TSH) : null,
      amh: AMH !== undefined && AMH !== null ? Number(AMH) : null,
      prolactin: prolactin !== undefined && prolactin !== null ? Number(prolactin) : null,
      vitaminD3: vitaminD3 !== undefined && vitaminD3 !== null ? Number(vitaminD3) : null,
      progesterone: progesterone !== undefined && progesterone !== null ? Number(progesterone) : null,
      rbs: randomBloodSugar !== undefined && randomBloodSugar !== null ? Number(randomBloodSugar) : null,
    });

    // Payload for ML service 
    const mlPayload = {
      // simple fields
      age_yrs: Number(age),
      bmi: Number(bmi),
      pulse_rate_bpm: Number(pulseRate),
      rr_breaths_min: Number(respiratoryRate),
      hb_g_dl: Number(hemoglobin),
      cycle_r_i: cycleVal,
      cycle_length_days: Number(averageCycleLength),
      weight_gain_y_n: to01(weightGain),
      hair_growth_y_n: to01(hairGrowth),
      skin_darkening_y_n: to01(skinDarkening),
      hair_loss_y_n: to01(hairLoss),
      pimples_y_n: to01(pimples),
      fast_food_y_n: to01(fastFood),
      reg_exercise_y_n: to01(regularExercise),
      bp_systolic_mmhg: Number(bpSystolic),
      bp_diastolic_mmhg: Number(bpDiastolic),

      // labs (send null if missing; Python pipeline imputers can handle)
      i_beta_hcg_miu_ml: B_HCG_Test1 !== undefined && B_HCG_Test1 !== null ? Number(B_HCG_Test1) : null,
      ii_beta_hcg_miu_ml: B_HCG_Test2 !== undefined && B_HCG_Test2 !== null ? Number(B_HCG_Test2) : null,
      fsh_miu_ml: FSH !== undefined && FSH !== null ? Number(FSH) : null,
      lh_miu_ml: LH !== undefined && LH !== null ? Number(LH) : null,
      fsh_lh: FSHLH_Ratio !== undefined && FSHLH_Ratio !== null ? Number(FSHLH_Ratio) : null,
      tsh_miu_l: TSH !== undefined && TSH !== null ? Number(TSH) : null,
      amh_ng_ml: AMH !== undefined && AMH !== null ? Number(AMH) : null,
      prl_ng_ml: prolactin !== undefined && prolactin !== null ? Number(prolactin) : null,
      vit_d3_ng_ml: vitaminD3 !== undefined && vitaminD3 !== null ? Number(vitaminD3) : null,
      prg_ng_ml: progesterone !== undefined && progesterone !== null ? Number(progesterone) : null,
      rbs_mg_dl: randomBloodSugar !== undefined && randomBloodSugar !== null ? Number(randomBloodSugar) : null,
    };

    // Call ML
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict/clinical`, mlPayload, {
      timeout: 30000,
    });

    // Save ML output
    saved.modelOutput = mlResponse.data; 
    await saved.save();

    return res.status(200).json({
      message: "Prediction completed",
      submissionId: saved._id,
      inputMode: "clinical",
      mlResult: mlResponse.data,
    });
  } catch (err) {
    console.error("sendDataToClinicalTextModel error:", err?.response?.data || err.message);
    return res.status(500).json({
      message: "Failed to process clinical text model request",
      error: err?.response?.data || err.message,
    });
  }
};

module.exports = { sendDataToSimpleTextModel, sendDataToClinicalTextModel };