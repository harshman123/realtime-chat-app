import { useContext } from "react"

import AuthContext from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import authService from "../services/authService"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     await authService.login(formData)

  //     navigate("/")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const data = await authService.login(formData)

    login(data)

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button className="bg-green-500 text-white w-full py-3 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login