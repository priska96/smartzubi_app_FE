import { useEffect, useState } from 'react';
import { tokenRefresh, getUser } from '@/app/api';
import { AuthContext } from './AuthContext';
import {
    useAuthAccessToken,
    useAuthRefreshToken,
    useAuthUser,
} from '@/features/authentication/hooks';
import { useAuthStore } from '@/store';
import { useApplyToken } from '@/features/authentication/hooks';

function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setAuth, setAuthUser } = useAuthStore();
    const user = useAuthUser();
    const currAccessToken = useAuthAccessToken();
    const refreshToken = useAuthRefreshToken();
    const { applyToken } = useApplyToken();
    const [loading, setLoading] = useState(true);

    const refreshTokens = async () => {
        try {
            if (refreshToken && currAccessToken && user) {
                console.log('Refreshing tokens');
                const { access_token: accessToken } = await tokenRefresh({
                    refreshToken: refreshToken,
                    accessToken: currAccessToken,
                    user_id: user.id,
                });
                console.log('Refreshing tokens success');
                applyToken(accessToken);
                const userData = await getUser(accessToken);
                setAuthUser(userData);
            }
        } catch (e) {
            setAuth(undefined);
            window.location.href = '/login';

            throw e;
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            applyToken(currAccessToken ?? '');
            if (currAccessToken) {
                try {
                    const userData = await getUser(currAccessToken);
                    setAuthUser(userData);
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
        ); // Refresh every 25 minutes

        return () => clearInterval(interval);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    console.log({ loading, user });
    return (
        <AuthContext.Provider value={null}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
