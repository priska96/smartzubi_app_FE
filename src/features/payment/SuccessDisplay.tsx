import { Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerBySessionId, updateUser } from '@/app/api';
import { useAuthStore } from '@/store';
import { useTranslation } from 'react-i18next';

export function SuccessDisplay() {
    const { t } = useTranslation();
    const query = new URLSearchParams(window.location.search);
    const { setAuthUser } = useAuthStore();
    const session_id = query.get('session_id');
    const user_id = query.get('user_id');
    const navigate = useNavigate(); // To programmatically navigate

    useEffect(() => {
        if (session_id && user_id && setAuthUser) {
            getCustomerBySessionId({ session_id })
                .then((res) => {
                    if (res.stripe_customer_id) {
                        updateUser(parseInt(user_id), {
                            stripe_customer_id: res.stripe_customer_id,
                            is_paying: true,
                        })
                            .then((data) => setAuthUser(data))
                            .catch((error) => console.log(error));
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [session_id, user_id, setAuthUser]);

    return (
        <Box className="flex flex-col gap-5  max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg text-center">
            <Typography variant="h4" component="h1" className="mb-4">
                {t('registration_success.title')}
            </Typography>
            <Typography variant="body1" className="mb-4">
                {t('registration_success.message')}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {t('registration_success.button')}
            </Button>
        </Box>
    );
}
