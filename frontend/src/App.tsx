import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import LoginPage from '@/features/auth/pages/LoginPage.tsx';
import RegisterPage from '@/features/auth/pages/RegisterPage.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
