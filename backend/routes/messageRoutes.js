const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getConversation,
} = require("../controllers/messageController");

// GET CONVERSATION
router.get("/:receiverId", protect, getConversation);

module.exports = router;