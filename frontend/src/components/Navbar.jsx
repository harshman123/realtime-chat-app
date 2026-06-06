import { useContext } from "react"

import { Link, useNavigate } from "react-router-dom"

import AuthContext from "../context/AuthContext"

const Navbar = () => {
  const navigate = useNavigate()

  const { user, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()

    navigate("/login")
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Chat App
      </h1>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <p>{user.name}</p>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar