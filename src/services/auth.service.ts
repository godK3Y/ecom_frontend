import { api } from "./api.service";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/interfaces/auth";
import type { User } from "@/interfaces/user";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  }
}

export const authService = new AuthService();
