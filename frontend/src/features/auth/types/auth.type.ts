export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    token: string;
    user: UserResponse;
}
