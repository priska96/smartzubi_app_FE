import { Typography, Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Quiz } from '@/components/Exam/Exam';
import { useAuth } from '@/provider/AuthContext';

function ExamPage() {
    const params = useParams();
    const { user } = useAuth();

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
