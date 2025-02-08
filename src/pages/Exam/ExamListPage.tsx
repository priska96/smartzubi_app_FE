import { Typography, Stack, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExamList from '@/components/Exam/ExamList';
import { useAuthUser } from '@/features/authentication/hooks';

function ExamListPage() {
    const { t } = useTranslation();
    const user = useAuthUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-4">
            <Stack gap={1} my={2}>
                <Typography textAlign="center" variant="subtitle1">
                    {t('exams.list_title')}
                </Typography>
            </Stack>
            <ExamList />
        </Container>
    );
}

export default ExamListPage;
