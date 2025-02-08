import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants';

const api = axios.create({
    baseURL: API_URL, // Your backend URL
});

const apiAuth = axios.create({
    baseURL: API_URL, // Your backend URL
});

apiAuth.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
apiAuth.interceptors.response.use(
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

const openAIApi = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
});

apiAuth.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers.Authorization = `Bearer ${'OPENAI_API_KEY'}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export { api, apiAuth, openAIApi };
