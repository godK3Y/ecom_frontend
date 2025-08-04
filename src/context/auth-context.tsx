"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { User, LoginCredentials, RegisterData } from "@/interfaces/auth"
import { authService } from "@/services/auth.service"

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" }

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null }
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      }
    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
    case "AUTH_LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        try {
          dispatch({ type: "AUTH_START" })
          const user = await authService.getCurrentUser()
          dispatch({ type: "AUTH_SUCCESS", payload: user })
        } catch (error) {
          dispatch({ type: "AUTH_ERROR", payload: "Session expired" })
          localStorage.removeItem("auth_token")
        }
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authService.login(credentials)
      localStorage.setItem("auth_token", response.token)
      dispatch({ type: "AUTH_SUCCESS", payload: response.user })
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error instanceof Error ? error.message : "Login failed" })
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authService.register(data)
      localStorage.setItem("auth_token", response.token)
      dispatch({ type: "AUTH_SUCCESS", payload: response.user })
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error instanceof Error ? error.message : "Registration failed" })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    dispatch({ type: "AUTH_LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
