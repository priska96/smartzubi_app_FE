import { useAuthStore } from '@/store';

export const useAuth = () => {
    const accessToken = useAuthStore((state) => state.auth?.access_token);
    return accessToken ? { isRoot: false } : null;
};

export const useAuthUser = () => {
    const authUser = useAuthStore((state) => state.auth?.user);
    return authUser;
};
