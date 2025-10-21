"use client" 

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from 'jwt-decode'
import toast from "react-hot-toast"

// type definition for a user object
export type User = { id: number; email: string; name?: string }

// type definition for everything provided by the AuthContext
type AuthContextType = {
  user: User | null           
  token: string | null        
  login: (token: string, user: User) => void 
  logout: () => void            
  loading: boolean           
};

// create a new context that will hold authentication info
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// custom hook 
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
};

// main AuthProvider component that wraps in layout/app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)   
  const [token, setToken] = useState<string | null>(null) 
  const [loading, setLoading] = useState(true)          
  const router = useRouter()

  // type declare for decoded JWT 
  type decodedToken = { exp: number }

  // when app loads, check if there's a stored token/user in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    // if both token and user exist (and not undefined)
    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        // Decode the JWT to check if it’s expired
        const decoded = jwtDecode<decodedToken>(storedToken)

        // compare expiration time (in ms) with current time
        if (decoded.exp * 1000 < Date.now()) {
          console.warn('Token expired, logging out')
          toast.error("Session expired. Please log in again.");
          logout()
          return
        }

        // token valid > restore session
        setToken(storedToken)
        setUser(JSON.parse(storedUser))

      } catch (err) {
        console.error('Invalid token:', err)
        logout()
      }
      finally{
        setLoading(false) //avoids infinte loading
      }
    }
  }, [])

  // login function > store token & user in memory
  const login = (token: string, user: User) => {
    setToken(token)
    setUser(user)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  };

  // logout function > clear everything & redirect to login page
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  };

  // provide all auth-related values & functions to children
  return (
    <AuthContext.Provider value={{  user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
