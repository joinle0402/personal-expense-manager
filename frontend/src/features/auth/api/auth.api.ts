import { joinpath } from '@/shared/utils/api-path.ts';
import { http } from '@/lib/axios.ts';
import type { AuthResponse } from '@/features/auth/types/auth.type.ts';
import type { LoginFormValues } from '@/features/auth/schemas/auth.schema.ts';

const rootPath = 'auth';

export const authApi = {
    async login(request: LoginFormValues) {
        return http.post<AuthResponse>(joinpath(rootPath, 'login'), request);
    },
};
