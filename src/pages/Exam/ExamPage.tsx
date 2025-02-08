import { Typography, Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Quiz } from '@/components/Exam/Exam';
import { useAuthUser } from '@/features/authentication/hooks';

function ExamPage() {
    const params = useParams();
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
            <Quiz exam_id={params.exam_id} />
        </Container>
    );
}

export default ExamPage;
