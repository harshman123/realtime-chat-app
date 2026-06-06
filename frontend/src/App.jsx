import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App