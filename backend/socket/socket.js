const { Server } = require("socket.io");
// const Message = require("../models/Message");
const { saveMessage } = require("../controllers/messageController");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
},
  });
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online_users", [...onlineUsers.keys()]);
    });

    // send message
   socket.on("send_message", async (data) => {
  try {
    const receiverSocketId = onlineUsers.get(data.receiver);

    // Receiver online?
    data.delivered = !!receiverSocketId;

    const message = await saveMessage(data);

    const senderSocketId = onlineUsers.get(data.sender);

    // Receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", message);
    }

    // Sender
    if (senderSocketId) {
      io.to(senderSocketId).emit("receive_message", message);
    }
  } catch (error) {
    console.error(error);
  }
});
    // disconnect
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    
      io.emit("online_users", [...onlineUsers.keys()]);
    });

  });
};

module.exports = initializeSocket;