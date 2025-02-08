import { Typography, Stack, Container } from '@mui/material';
import ExamList from '@/components/Exam/ExamList';
import { useAuthUser } from '@/features/authentication/hooks';

function ExamListPage() {
    const user = useAuthUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-4">
            <Stack gap={1} my={2}>
                <Typography textAlign="center" variant="subtitle1">
                    IHK Pruefungsfragen
                </Typography>
            </Stack>
            <ExamList />
        </Container>
    );
}

export default ExamListPage;
