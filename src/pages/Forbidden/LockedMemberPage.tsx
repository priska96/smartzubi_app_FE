import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthUser } from '@/features/authentication/hooks';

export function LockedMemberPage() {
    const { t } = useTranslation();

    const user = useAuthUser();

    const handleContactSupport = async () => {
        if (!user) return;
        //contact supppoer
    };

    return (
        <Box className="flex flex-col gap-5 max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg text-center">
            <Typography variant="h4" component="h1" className="mb-4">
                {t('forbidden.locked-member.sorry')}
            </Typography>
            <Typography variant="body1" className="mb-4">
                {t('forbidden.locked-member.access-denied')}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleContactSupport}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {t('forbidden.locked-member.upgrade-btn')}
            </Button>
        </Box>
    );
}
