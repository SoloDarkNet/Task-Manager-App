const express = require("express");
const router = express.Router();
const {
  saveSubscription,
  removeSubscription,
  sendTestNotification,
} = require("../Controller/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/subscribe", authMiddleware, saveSubscription);
router.delete("/subscribe", authMiddleware, removeSubscription);
router.post("/test", authMiddleware, sendTestNotification);

module.exports = router;
