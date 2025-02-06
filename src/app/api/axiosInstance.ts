import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants';

const api = axios.create({
    baseURL: API_URL, // Your backend URL
});

const api_auth = axios.create({
    baseURL: API_URL, // Your backend URL
});

api_auth.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
api_auth.interceptors.response.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    (error: AxiosError) => {
        if (error.response?.status === 403) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { api, api_auth };
