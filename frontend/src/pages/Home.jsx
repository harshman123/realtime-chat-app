import { useEffect, useState } from "react"

import socket from "../socket"
import axios from "axios"
import { useRef } from "react"

const Home = () => {
  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([])

  const [onlineUsers, setOnlineUsers] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))
  const messagesEndRef = useRef(null)


  // RECEIVE MESSAGE
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessages((prev) => [...prev, data])
  //   })

  //   return () => {
  //     socket.off("receive_message")
  //   }
  // }, [])

//   useEffect(() => {
//   // LOAD OLD MESSAGES
//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/messages"
//       )

//       setMessages(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   fetchMessages()

//   // RECEIVE NEW MESSAGES
//   socket.on("receive_message", (data) => {
//     setMessages((prev) => [...prev, data])
//   })

//   return () => {
//     socket.off("receive_message")
//   }
// }, [])

  useEffect(() => {
  // LOAD OLD MESSAGES
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/messages"
      )

      setMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchMessages()

  // JOIN CHAT
  socket.emit("join", user.name)

  // ONLINE USERS
  socket.on("online_users", (users) => {
    setOnlineUsers(users)
  })

  // RECEIVE NEW MESSAGE
  socket.on("receive_message", (data) => {
    setMessages((prev) => [...prev, data])

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  })

  // CLEANUP
  return () => {
    socket.off("receive_message")

    socket.off("online_users")
  }
}, [])

  // SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return

    const messageData = {
      sender: user.name,
      text: message,
    }

    socket.emit("send_message", messageData)

    setMessage("")
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Real-Time Chat
      </h1>

    <div className="mb-4">
      <h2 className="font-bold mb-2">
        Online Users
      </h2>

      <div className="flex gap-2 flex-wrap">
        {onlineUsers.map((user, index) => (
          <span
            key={index}
            className="bg-green-200 px-3 py-1 rounded-full"
          >
            {user}
          </span>
        ))}
      </div>
    </div>


      {/* MESSAGES */}
      <div className="h-[400px] overflow-y-auto border p-4 mb-4 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-blue-100 p-3 rounded mb-2"
          >
            {/* <p>{msg.text}</p> */}

            <h3 className="font-bold">
              {msg.sender}
            </h3>

            <p>{msg.text}</p>

            <span className="text-sm text-gray-500">
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-3 rounded"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Home