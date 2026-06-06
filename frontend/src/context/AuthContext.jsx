import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // LOGIN
  const login = (userData) => {
    setUser(userData)

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )
  }

  // LOGOUT
  const logout = () => {
    setUser(null)

    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext