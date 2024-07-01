import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IUser {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: IUser | null
  setUser: (user: IUser | null) => void
  clearUser: () => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-store', // Nombre del key en localStorage
    },
  ),
)
