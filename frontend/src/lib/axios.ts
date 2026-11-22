import axios, { type AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    (error: unknown) => Promise.reject(error),
);

class HttpClient {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await axiosInstance.get<T>(url, config);
        return data;
    }

    async post<T, D = unknown>(url: string, payload?: D, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await axiosInstance.post<T>(url, payload, config);
        return data;
    }

    async put<T, D = unknown>(url: string, payload?: D, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await axiosInstance.put<T>(url, payload, config);
        return data;
    }

    async patch<T, D = unknown>(url: string, payload?: D, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await axiosInstance.patch<T>(url, payload, config);
        return data;
    }

    async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await axiosInstance.delete<T>(url, config);
        return data;
    }
}

export const http = new HttpClient();
