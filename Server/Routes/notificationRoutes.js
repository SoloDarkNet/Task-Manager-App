const express = require("express");
const router = express.Router();
const { saveSubscription } = require("../Controller/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/subscribe", authMiddleware, saveSubscription);

module.exports = router;
