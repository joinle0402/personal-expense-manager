import { joinpath } from '@/shared/utils/api-path.ts';
import { http } from '@/lib/axios.ts';
import type { AuthResponse, LoginRequest } from '@/features/auth/types/auth.type.ts';

const rootPath = 'auth';

export const authApi = {
    async login(request: LoginRequest) {
        return http.post<AuthResponse>(joinpath(rootPath, 'login'), request);
    },
};
