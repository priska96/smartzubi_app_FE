import * as authApi from '@/app/api/authApi';
import { ForgotPasswordReq } from '@/app/api/types';

export const useForgotPassword = () => {
    /**
     * forgotPassword will send an email to the user with a new password.
     *
     * @param values the email of the user
     */
    const forgotPassword = async (values: ForgotPasswordReq) => {
        const response = await authApi.forgotPassword({
            email: values.email.trim(),
        });
        return response;
    };

    return {
        forgotPassword,
    };
};
