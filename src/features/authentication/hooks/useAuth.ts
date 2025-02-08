import { useAuthStore } from '@/store';

export const useAuthAccessToken = () => {
    const accessToken = useAuthStore((state) => state.auth?.access_token);
    return accessToken;
};

export const useAuthRefreshToken = () => {
    const refreshToken = useAuthStore((state) => state.auth?.refresh_token);
    return refreshToken;
};

export const useAuthUser = () => {
    const authUser = useAuthStore((state) => state.auth?.user);
    return authUser;
};
