import { useEffect, useState } from "react"

import socket from "../socket"
import axios from "axios"
import { useRef } from "react"

const Home = () => {
  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([])

  const [onlineUsers, setOnlineUsers] = useState([])

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"))
  const messagesEndRef = useRef(null)




  useEffect(() => {
  
  // const fetchMessages = async () => {
 

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/users",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
  
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUsers();


  // JOIN CHAT
  socket.emit("join", user._id)

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

  useEffect(() => {
  if (!selectedUser) return;

  const fetchConversation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchConversation();
}, [selectedUser]);


//     useEffect(() => {
//   console.log(selectedUser);
// }, [selectedUser]);

  // SEND MESSAGE
 const sendMessage = () => {
  if (!message.trim() || !selectedUser) return;

  const messageData = {
    sender: user._id,
    receiver: selectedUser._id,
    text: message,
  };

  socket.emit("send_message", messageData);

  setMessage("");
};

  return (
  <div className="h-[88vh] max-w-6xl mx-auto mt-5 bg-white rounded-xl shadow-xl flex overflow-hidden">

    {/* ================= LEFT SIDEBAR ================= */}
    <div className="w-[30%] border-r flex flex-col">

      {/* Header */}
      <div className="p-5 border-b bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">Let'sChat</h1>
        <p className="text-sm text-blue-100 mt-1">
          Real-Time Messaging
        </p>

        <input
          type="text"
          placeholder="Search users..."
          className="mt-4 w-full px-3 py-2 rounded-lg text-black outline-none"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">

        {users.map((chatUser) => (

          <div
            key={chatUser._id}
            onClick={() => setSelectedUser(chatUser)}
            className={`flex items-center justify-between px-5 py-4 cursor-pointer transition duration-200
            ${
              selectedUser?._id === chatUser._id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >

            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
                {chatUser.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold">
                  {chatUser.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {onlineUsers.includes(chatUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>

            </div>

            <div
              className={`w-3 h-3 rounded-full
              ${
                onlineUsers.includes(chatUser._id)
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>

          </div>

        ))}

      </div>
    </div>

    {/* ================= CHAT AREA ================= */}
    <div className="flex-1 flex flex-col">

      {/* Chat Header */}
      <div className="border-b p-5 bg-gray-50">

        {selectedUser ? (
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold uppercase">
              {selectedUser.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {selectedUser.name}
              </h2>

              <p className="text-sm text-gray-500">
                {onlineUsers.includes(selectedUser._id)
                  ? "🟢 Online"
                  : "⚪ Offline"}
              </p>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl text-gray-500">
              Select a user to start chatting
            </h2>
          </div>
        )}

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-100">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === user._id
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-md rounded-2xl px-4 py-3 shadow
              ${
                msg.sender === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >

              {/* <h4 className="font-bold text-sm">
                {msg.sender}
              </h4> */}

              <p className="mt-1">
                {msg.text}
              </p>

             <div className="flex justify-end items-center gap-1 mt-1">
              <span className="text-xs">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              {msg.sender === user._id && (
                <span className="text-xs">
                  {msg.delivered ? "✓" : ""}
                </span>
              )}
            </div>

              {/* <p className="text-xs mt-2 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p> */}

            </div>

          </div>

        ))}

        <div ref={messagesEndRef}></div>

      </div>

      {/* Input */}
      <div className="border-t bg-white p-4 flex gap-3">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full transition"
        >
          Send
        </button>

      </div>

    </div>

  </div>
);
}

export default Home