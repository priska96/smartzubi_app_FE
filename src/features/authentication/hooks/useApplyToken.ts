import { apiAuth } from '@/app/api';
import { AxiosError } from 'axios';

export const useApplyToken = () => {
    const applyToken = (token: string) => {
        apiAuth.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );
        apiAuth.interceptors.response.use(
            (config) => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error: AxiosError) => {
                if (error.response?.status === 403) {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    };

    return { applyToken };
};
