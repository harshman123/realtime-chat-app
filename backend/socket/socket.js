const { Server } = require("socket.io");
// const Message = require("../models/Message");
const { saveMessage } = require("../controllers/messageController");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
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
        const message = await saveMessage(data);
    
        io.emit("receive_message", message);
      } catch (error) {
        console.error("Message Error:", error);
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