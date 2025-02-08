import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants';

const api = axios.create({
    baseURL: API_URL, // Your backend URL
});

const apiAuth = axios.create({
    baseURL: API_URL, // Your backend URL
});

const openAIApi = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
});

openAIApi.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers.Authorization = `Bearer ${'OPENAI_API_KEY'}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export { api, apiAuth, openAIApi };
