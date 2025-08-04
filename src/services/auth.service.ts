import type { AuthResponse, LoginCredentials, RegisterData, User } from "@/interfaces/auth"

class AuthService {
  // Mock user data
  private mockUser: User = {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "customer",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple mock validation
    if (credentials.email === "john.doe@example.com" && credentials.password === "password123") {
      return {
        user: this.mockUser,
        token: "mock-jwt-token",
        refreshToken: "mock-refresh-token",
      }
    }

    throw new Error("Invalid email or password")
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create new user with provided data
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      user: newUser,
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
    }
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Clear any stored tokens
  }

  async getCurrentUser(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.mockUser
  }

  async refreshToken(): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      user: this.mockUser,
      token: "new-mock-jwt-token",
      refreshToken: "new-mock-refresh-token",
    }
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password reset email sent to:", email)
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password changed successfully")
  }
}

export const authService = new AuthService()
