import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  cartOpen: boolean;
  notifications: Notification[];
  loadingStates: Record<string, boolean>;
  modals: Record<string, boolean>;
}

interface UIActions {
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (key: string, loading: boolean) => void;
  toggleModal: (key: string) => void;
  setModal: (key: string, open: boolean) => void;
  closeAllModals: () => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: "system",
      sidebarOpen: false,
      mobileMenuOpen: false,
      searchOpen: false,
      cartOpen: false,
      notifications: [],
      loadingStates: {},
      modals: {},

      // Actions
      setTheme: (theme) => {
        set({ theme });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
      },

      setMobileMenuOpen: (open) => {
        set({ mobileMenuOpen: open });
      },

      toggleSearch: () => {
        set((state) => ({ searchOpen: !state.searchOpen }));
      },

      setSearchOpen: (open) => {
        set({ searchOpen: open });
      },

      toggleCart: () => {
        set((state) => ({ cartOpen: !state.cartOpen }));
      },

      setCartOpen: (open) => {
        set({ cartOpen: open });
      },

      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: Notification = {
          ...notification,
          id,
          timestamp: Date.now(),
        };

        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after duration
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration);
        }
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      setLoading: (key, loading) => {
        set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: loading,
          },
        }));
      },

      toggleModal: (key) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [key]: !state.modals[key],
          },
        }));
      },

      setModal: (key, open) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [key]: open,
          },
        }));
      },

      closeAllModals: () => {
        set({ modals: {} });
      },
    }),
    {
      name: "keycommerce-ui",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// Selectors for better performance
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useMobileMenuOpen = () =>
  useUIStore((state) => state.mobileMenuOpen);
export const useSearchOpen = () => useUIStore((state) => state.searchOpen);
export const useCartOpen = () => useUIStore((state) => state.cartOpen);
export const useNotifications = () =>
  useUIStore((state) => state.notifications);
export const useLoadingState = (key: string) =>
  useUIStore((state) => state.loadingStates[key] || false);
export const useModalOpen = (key: string) =>
  useUIStore((state) => state.modals[key] || false);

// Helper functions
export const useIsLoading = () => {
  const loadingStates = useUIStore((state) => state.loadingStates);
  return Object.values(loadingStates).some(Boolean);
};

export const useHasOpenModals = () => {
  const modals = useUIStore((state) => state.modals);
  return Object.values(modals).some(Boolean);
};
