import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import type { UserResponse } from '@/features/auth/types/auth.type.ts';

interface AuthState {
    user?: UserResponse | null;
    login: (user: UserResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                user: state.user,
            }),
        },
    ),
);
