// contexts/auth-context.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { getCurrentUser, signIn, signOut, signUp } from "@/lib/auth"

// Define types for the function arguments
interface LoginParams {
  email: string;
  password?: string;
}

interface RegisterParams {
  name: string;
  email: string;
  password?: string;
  role?: "organizer" | "guest";
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (params: LoginParams) => Promise<User>
  register: (params: RegisterParams) => Promise<User>
  logout: () => void
  isOrganizer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (params: LoginParams): Promise<User> => {
    // No try/catch here, we want the error to propagate to the form
    const user = await signIn(params)
    setUser(user)
    return user
  }

  const register = async (params: RegisterParams): Promise<User> => {
    if (!params.password) {
      throw new Error("Password is required for registration.");
    }
    // No try/catch here, we want the error to propagate to the form
    const user = await signUp(params)
    setUser(user)
    return user
  }

  const logout = () => {
    signOut()
    setUser(null)
  }

  const isOrganizer = user?.role === "organizer"

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isOrganizer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}