# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the MERN Stack and Socket.IO. Users can create accounts, securely log in, send instant messages, and see online users in real time.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 💬 Real-time messaging using Socket.IO
- 🟢 Online/Offline user status
- 👤 User Profile Management
- 📷 Profile Picture Upload
- 🔒 Secure Password Hashing with bcrypt
- 📱 Responsive UI
- ⚡ Instant Message Delivery
- 🌐 RESTful APIs
- 🎨 Modern User Interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcrypt

### Database
- MongoDB
- Mongoose

---

## 📂 Project Structure

```
Realtime-Chat-App
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── socket
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/harshman123/realtime-chat-app.git
```

Move into the project

```bash
cd realtime-chat-app
```

---

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

> Add screenshots of:
- Login Page
- Signup Page
- Chat Interface
- Profile Page

Example:

```
screenshots/
    login.png
    signup.png
    chat.png
    profile.png
```

---

## 📈 Future Improvements

- Group Chat
- Message Reactions
- Voice Calling
- Video Calling
- Read Receipts
- Typing Indicator
- Dark Mode
- File Sharing

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Harsh Kumar**

GitHub: https://github.com/harshman123

LinkedIn: https://www.linkedin.com/in/harsh-kumar-a4b7522ab

Email:keshari321harsh@gmail.com