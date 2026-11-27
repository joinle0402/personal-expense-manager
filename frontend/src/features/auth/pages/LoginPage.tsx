import { Link as RouterLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormValues, loginSchema } from '@/features/auth/schemas/auth.schema.ts';
import Stack from '@mui/material/Stack';
import InputField from '@/shared/components/form/InputField.tsx';
import PasswordField from '@/shared/components/form/PasswordField.tsx';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useLogin } from '@/features/auth/hooks/useLogin.ts';
import { isAxiosError } from 'axios';
import type { ValidationError } from '@/shared/types/api.ts';
import { notify } from '@/features/notification';

export default function LoginPage() {
    const { control, handleSubmit, setError, formState } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const { isSubmitting } = formState;
    const loginMutation = useLogin();

    const onSubmit = async (formValues: LoginFormValues) => {
        try {
            await loginMutation.mutateAsync(formValues);
            notify.success('Đăng nhập thành công!');
        } catch (error: unknown) {
            if (isAxiosError<ValidationError>(error)) {
                if (error.response?.status === 422) {
                    const validationErrors = error.response.data.errors;
                    Object.entries(validationErrors).forEach(([field, messages]) => {
                        setError(field as keyof LoginFormValues, {
                            type: 'server',
                            message: messages[0],
                        });
                    });
                }
                notify.error(error.response?.data.message || 'Email hoặc mật khẩu không chính xác.');
            }
        }
    };
    const loading = loginMutation.isPending || isSubmitting;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'grey.100',
                p: 2,
            }}
        >
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 420, p: 4 }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                    Đăng nhập
                </Typography>

                <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputField control={control} name="email" label="Email" type="email" autoComplete="email" autoFocus fullWidth />
                    <PasswordField control={control} name="password" label="Mật khẩu" autoComplete="current-password" fullWidth />
                    <Button type="submit" variant="contained" size="medium" loading={loading} fullWidth>
                        Đăng nhập
                    </Button>
                </Stack>

                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Chưa có tài khoản?{' '}
                    <Link component={RouterLink} to="/register" underline="hover" sx={{ fontWeight: 600 }}>
                        Đăng ký ngay
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
