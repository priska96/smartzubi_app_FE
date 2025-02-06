import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '@/provider/AuthContext';
import { createCheckoutSession, STANDARD_MONTHLY } from '@/app/api';
import { useTranslation } from 'react-i18next';

export function FreeMemberPage() {
    const { t } = useTranslation();

    const { user } = useAuth();

    const handleCreateCheckoutSession = async () => {
        if (!user) return;
        const res = await createCheckoutSession({
            lookup_key: STANDARD_MONTHLY,
            email: user.email,
            user_id: user.id,
        });
        window.open(res.checkout_session_url, '_top');
    };

    return (
        <Box className="flex flex-col gap-5 max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg text-center">
            <Typography variant="h4" component="h1" className="mb-4">
                {t('forbidden.free-member.sorry')}
            </Typography>
            <Typography variant="body1" className="mb-4">
                {t('forbidden.free-member.access-denied')}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateCheckoutSession}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {t('forbidden.free-member.upgrade-btn')}
            </Button>
        </Box>
    );
}
