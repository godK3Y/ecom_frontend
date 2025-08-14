import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/interfaces/auth";
// Import our internal User interface as well as the raw API type. The
// local `user.ts` file defines both the internal shape we use
// throughout the application (`User`) and the API response shape
// (`ApiUserProfile`). We import them directly here to avoid relying on
// unresolved path aliases. If your project uses path aliases (e.g.
// `@/interfaces`), adjust these imports accordingly.
import { User, ApiUserProfile } from "@/interfaces/user";
import { api } from "./api.service";
class AuthService {
  /**
   * Converts a raw user profile returned by the backend API into
   * our internal `User` representation. The API returns a single
   * `name` field along with an `_id` field. We split the name into
   * first and last names and map `_id` to our `id` field. If the
   * full name has only one part, the entire string is treated as
   * the first name and the last name is left empty.
   */
  private transformApiUser(apiUser: ApiUserProfile): User {
    // Guard against missing or empty names. Split on whitespace and
    // remove any empty segments.
    const nameParts = apiUser.name ? apiUser.name.trim().split(/\s+/) : [];
    const firstName = nameParts.length > 0 ? nameParts[0] : "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    return {
      id: apiUser._id,
      email: apiUser.email,
      firstName,
      lastName,
      role: apiUser.role,
      avatar: undefined,
      phone: apiUser.phone,
      // The backend does not provide a date of birth in the
      // `/users/profile` response. Assign undefined so the UI
      // gracefully handles it.
      dateOfBirth: undefined,
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt,
    };
  }

  /**
   * Fetch the currently authenticated user from the backend. This
   * wraps a call to `GET /users/profile` and normalises the
   * response into our internal `User` model via
   * `transformApiUser`. If the request fails, the error will be
   * propagated to the caller.
   */
  async getUserProfile(): Promise<User> {
    const response = await api.get<ApiUserProfile>("/users/profile");
    return this.transformApiUser(response.data);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Clear any stored tokens
  }

  async getCurrentUser(): Promise<User> {
    // Fetch the current user from the backend rather than returning
    // hard‑coded data. This delegates to `getUserProfile` so that
    // consumers always receive our internal `User` shape.
    return this.getUserProfile();
  }

  async refreshToken(): Promise<AuthResponse> {
    // In a real application you would call the backend to refresh
    // tokens. Here we simply reuse the current user fetched from
    // `/users/profile` and return placeholder tokens. Should the
    // refresh endpoint become available, replace this logic with a
    // proper API call.
    const currentUser = await this.getUserProfile();
    return {
      user: currentUser,
      token: "new-mock-jwt-token",
      refreshToken: "new-mock-refresh-token",
    };
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password reset email sent to:", email);
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password changed successfully");
  }
}

export const authService = new AuthService();
