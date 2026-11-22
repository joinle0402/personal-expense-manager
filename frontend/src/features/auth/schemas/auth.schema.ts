import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().min(1, 'Vui lòng nhập email!').pipe(z.email('Email không hợp lệ')),
    password: z.string().trim().min(1, 'Vui lòng nhập mật khẩu').min(4, 'Mật khẩu tối thiểu 4 ký tự'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
