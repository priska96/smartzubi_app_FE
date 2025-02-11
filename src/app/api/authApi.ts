import { api, apiAuth } from './axiosInstance';
import { User } from './models';
import {
    ForgotPasswordReq,
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
        const response = await apiAuth.post(
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
    refresh_token,
    access_token,
    user_id,
}: TokenRefreshReqData): Promise<TokenRefreshResData> => {
    try {
        const response = await api.post(
            '/api/refresh',
            { refresh_token, user_id },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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

export const forgotPassword = async ({
    email,
}: ForgotPasswordReq): Promise<any> => {
    try {
        const response = await api.post('/api/forgot-password', {
            email,
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};
