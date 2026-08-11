const Message = require("../models/Message");



const getConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const saveMessage = async (data) => {
   const message = await Message.create({
    sender: data.sender,
    receiver: data.receiver,
    text: data.text,
    delivered: data.delivered,
  });
    return message;
};
module.exports = {
  saveMessage,
  getConversation,
};