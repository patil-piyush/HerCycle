const express = require(`express`);
const { authMiddleware } = require(`../middlewares/authMiddleware`);
const {
  getUserProfile,
  getHistorySimpleTextModel,
  getHistoryClinicalTextModel,
  getHistoryImageModel,
  getHistoryCombinedModel
} = require(`../controllers/userController`);
 
const router = express.Router();

router.get(`/profile`, authMiddleware, getUserProfile);
router.get(`/history/simpleTextModel`, authMiddleware, getHistorySimpleTextModel);
router.get(`/history/clinicalTextModel`, authMiddleware, getHistoryClinicalTextModel);
router.get(`/history/imageModel`, authMiddleware, getHistoryImageModel);
router.get(`/history/combinedModel`, authMiddleware, getHistoryCombinedModel);


module.exports = router;