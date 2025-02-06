import { api, api_auth } from './axiosInstance';
import { User } from './models';
import {
    LoginReqData,
    LoginResData,
    RegisterReqData,
    RegisterResData,
    TokenRefreshReqData,
    TokenRefreshResData,
} from './types';

export const register = async ({
    username,
    email,
    password,
}: RegisterReqData): Promise<RegisterResData> => {
    try {
        const response = await api.post('/api/register', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};
export const login = async ({
    email,
    password,
}: LoginReqData): Promise<LoginResData> => {
    try {
        const response = await api.post('/api/login', {
            email,
            password,
            userAgent: navigator.userAgent,
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const logout = async () => {
    try {
        const response = await api_auth.post(
            '/api/logout',
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const tokenRefresh = async ({
    refreshToken,
    accessToken,
    user_id,
}: TokenRefreshReqData): Promise<TokenRefreshResData> => {
    try {
        const response = await api.post(
            '/api/refresh',
            { refreshToken, user_id },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getUser = async (accessToken: string): Promise<User> => {
    try {
        const response = await api.get('/api/auth-user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};
