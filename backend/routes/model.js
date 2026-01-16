const express = require(`express`);
const { authMiddleware } = require(`../middlewares/authMiddleware`);
const { sendDataToSimpleTextModel, sendDataToClinicalTextModel } = require(`../controllers/modelController`);
 
const router = express.Router();

router.post(`/simpleTextModel`, authMiddleware, sendDataToSimpleTextModel);
router.post(`/clinicalTextModel`, authMiddleware, sendDataToClinicalTextModel);

module.exports = router;