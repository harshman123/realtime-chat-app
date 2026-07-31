const Message = require("../models/Message");
const saveMessage = async (data) => {
    const message = await Message.create({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text,
    });
    return message;
};

module.exports = {
    saveMessage,
};