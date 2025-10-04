"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type User = { id: number; email: string; name?: string }

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  loading: boolean
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser && storedUser !== "undefined") {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null)
      }
    }

    setLoading(false)
  }, []);

  const login = (token: string, user: User) => {
    setToken(token)
    setUser(user)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  };

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
