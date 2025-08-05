import { useAuth as useAuthContext } from "@/stores/auth-context";

export const useAuth = () => {
  return useAuthContext();
};
