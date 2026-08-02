const express = require("express")

const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
} = require("../controllers/authController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

// REGISTER
router.post("/register", registerUser)

// LOGIN
router.post("/login", loginUser)

// GET CURRENT USER
router.get("/me", protect, getMe)


// GET ALL USERS
router.get("/users", protect, getUsers)

module.exports = router