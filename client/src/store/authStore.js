import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginApi, getMe } from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginApi(email, password);
          set({
            token: data.token,
            user: data.user || { email },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err) {
          const message =
            err.response?.data?.message || 'Invalid email or password';
          set({
            isLoading: false,
            error: message,
            isAuthenticated: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return false;
        }
        try {
          const data = await getMe();
          set({ user: data.user || data, isAuthenticated: true });
          return true;
        } catch {
          set({ token: null, user: null, isAuthenticated: false });
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
