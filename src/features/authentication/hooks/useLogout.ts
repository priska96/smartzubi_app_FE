import * as authApi from '@/app/api/authApi';
import { useAuthStore } from '@/store';
import { redirect } from 'react-router-dom';

export const useLogout = () => {
    const { setAuth } = useAuthStore();
    return async () => {
        authApi.logout();
        setAuth(undefined);

        // queryClient.clear();
        // queryClient.resetQueries();
        // queryClient.cancelQueries();
        redirect('/login');
    };
};
