import { Typography, Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PdfViewer } from '@/components/Exam/PdfViewer';
import { useAuth } from '@/provider/AuthContext';

function ExamViewerPage() {
    const params = useParams();
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <Container className="h-full !flex flex-col !px-0 overflow-hidden">
            <Stack gap={1} my={2}>
                <Typography textAlign="center" variant="subtitle1">
                    PDF Prüfung
                </Typography>
            </Stack>
            <PdfViewer exam_id={params.exam_id} />
        </Container>
    );
}

export default ExamViewerPage;
