const dns = require("node:dns");

// Force Node.js to use public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/db");
const initializeSocket = require("./socket/socket");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});