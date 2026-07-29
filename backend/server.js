const dns = require("node:dns");

// Force Node.js to use public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const Message = require("./models/Message");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Store online users
let onlineUsers = [];

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // User joins
  socket.on("join", (username) => {
    if (!onlineUsers.includes(username)) {
      onlineUsers.push(username);
    }

    io.emit("online_users", onlineUsers);
  });

  // Send Message
  socket.on("send_message", async (data) => {
    try {
      const message = await Message.create({
        sender: data.sender,
        text: data.text,
      });

      io.emit("receive_message", message);
    } catch (error) {
      console.error("Message Error:", error);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    onlineUsers = onlineUsers.filter((_, index) => index !== onlineUsers.length - 1);

    io.emit("online_users", onlineUsers);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});