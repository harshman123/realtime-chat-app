const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const Message = require("./models/Message")

const { Server } = require("socket.io")

const connectDB = require("./config/db")

dotenv.config()

connectDB()

const app = express()

// CREATE HTTP SERVER
const server = http.createServer(app)

// CREATE SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"))

app.use("/api/messages", require("./routes/messageRoutes"))

app.get("/", (req, res) => {
  res.send("API Running")
})

let onlineUsers = []

// SOCKET CONNECTION
// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id)

//   socket.on("send_message", async (data) => {
//   try {
//     // SAVE MESSAGE
//     const message = await Message.create({
//       sender: data.sender,
//       text: data.text,
//     })

//     // SEND TO ALL USERS
//     io.emit("receive_message", message)
//   } catch (error) {
//     console.log(error)
//   }
//   })


//   // DISCONNECT
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id)
//   })
// })

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id)

  // ADD USER
  socket.on("join", (username) => {
    onlineUsers.push(username)

    io.emit("online_users", onlineUsers)
  })

  // SEND MESSAGE
  socket.on("send_message", async (data) => {
    try {
      const message = await Message.create({
        sender: data.sender,
        text: data.text,
      })

      io.emit("receive_message", message)
    } catch (error) {
      console.log(error)
    }
  })

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User Disconnected")

    onlineUsers.pop()

    io.emit("online_users", onlineUsers)
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})