const express = require("express")

const Message = require("../models/Message")

const router = express.Router()

// GET ALL MESSAGES
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find()

    res.json(messages)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router