const express = require(`express`);
const multer = require("multer");
const { authMiddleware } = require(`../middlewares/authMiddleware`);
const { sendDataToSimpleTextModel, sendDataToClinicalTextModel, sendImageToImageModel } = require(`../controllers/modelController`);

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, 
});

router.post(`/simpleTextModel`, authMiddleware, sendDataToSimpleTextModel);
router.post(`/clinicalTextModel`, authMiddleware, sendDataToClinicalTextModel);
router.post("/imageModel", authMiddleware, upload.single("image"), sendImageToImageModel);
module.exports = router;