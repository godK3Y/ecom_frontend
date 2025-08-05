import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/services/api-client";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/interfaces/auth";
import type { User } from "@/interfaces/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.auth.login(credentials);

          if (response.success) {
            const { user, token } = response.data as AuthResponse;
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Login failed",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.auth.register(data);

          if (response.success) {
            const { user, token } = response.data as AuthResponse;
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Registration failed",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      logout: async () => {
        try {
          await api.auth.logout();
        } catch (error) {
          // Ignore logout errors
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      refreshToken: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.auth.refresh();

          if (response.success) {
            const { user, token: newToken } = response.data as AuthResponse;
            set({
              user,
              token: newToken,
              isAuthenticated: true,
            });
          } else {
            // Token refresh failed, logout user
            get().logout();
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Token refresh failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
          // Token refresh failed, logout user
          get().logout();
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.user.updateProfile(data);

          if (response.success) {
            const updatedUser = response.data as User;
            set({
              user: updatedUser,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Profile update failed",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Profile update failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setToken: (token: string | null) => {
        set({ token, isAuthenticated: !!token });
      },
    }),
    {
      name: "keycommerce-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
