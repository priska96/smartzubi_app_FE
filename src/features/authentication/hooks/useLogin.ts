import * as authApi from '@/app/api/authApi';
import { LoginReqData } from '@/app/api/types';
import { useAuthStore } from '@/store';
import { useApplyToken } from './useApplyToken';

export const useLogin = () => {
    const { setAuth } = useAuthStore();
    const { applyToken } = useApplyToken();
    /**
     * login will authenticate the user and set the token in the localtorage.
     *
     * @param values The login input values.
     */
    const login = async (values: LoginReqData) => {
        // queryClient.clear();
        // await queryClient.resetQueries();

        const response = await authApi.login({
            email: values.email.trim(),
            password: values.password.trim(),
        });

        setAuth(response);
        applyToken(response.access_token ?? '');
    };

    return {
        login,
    };
};
