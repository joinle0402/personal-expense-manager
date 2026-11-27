import { useAuthStore } from '@/features/auth/stores/authStore.ts';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api.ts';
import type { LoginFormValues } from '@/features/auth/schemas/auth.schema.ts';
import type { AuthResponse } from '@/features/auth/types/auth.type.ts';

export function useLogin() {
    const login = useAuthStore((state) => state.login);
    return useMutation({
        mutationFn: async (payload: LoginFormValues) => authApi.login(payload),
        onSuccess: (response: AuthResponse) => {
            login(response.user);
        },
    });
}
