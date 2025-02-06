import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    login as loginUser,
    logout as logoutUser,
    tokenRefresh,
    getUser,
} from '@/app/api';
import { User } from '@/app/api/models';
import { LoginReqData } from '@/app/api/types';
import { AuthContext } from './AuthContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (data: LoginReqData) => {
        try {
            const { access_token: accessToken, refresh_token: refreshToken } =
                await loginUser(data);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            const userData = await getUser(accessToken);
            setUser(userData);
        } catch (e) {
            throw e;
        }
    };

    const refreshTokens = async () => {
        try {
            const currAccessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken && currAccessToken && user) {
                const { access_token: accessToken } = await tokenRefresh({
                    refreshToken: refreshToken,
                    accessToken: currAccessToken,
                    user_id: user.id,
                });
                localStorage.setItem('access_token', accessToken);
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                const userData = await getUser(accessToken);
                setUser(userData);
            }
        } catch (e) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';

            throw e;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem('access_token');
            setUser(null);
        } catch (e) {
            throw e;
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            const accessToken = localStorage.getItem('access_token');
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            if (accessToken) {
                try {
                    const userData = await getUser(accessToken);
                    setUser(userData);
                } catch {
                    console.log('Failed to get user');
                    await refreshTokens();
                }
            }
            setLoading(false);
        };
        initializeUser();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const interval = setInterval(
            () => {
                refreshTokens().catch((e) => console.log(e));
            },
            25 * 60 * 1000
        ); // Refresh every 25 minutes // todo: increase interval later to 20min

        return () => clearInterval(interval);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    console.log({ loading, user });
    return (
        <AuthContext.Provider
            value={{ user: user || ({} as User), setUser, login, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
