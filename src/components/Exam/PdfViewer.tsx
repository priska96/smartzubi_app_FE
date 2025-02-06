import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { getExam } from '@/app/api';

export function PdfViewer({ exam_id }: { exam_id?: string }) {
    const [examLink, setExamLink] = useState<string | null>(null);

    useEffect(() => {
        if (!exam_id) return;
        getExam(parseInt(exam_id))
            .then((response) => setExamLink(response.google_drive_link))
            .catch((error) => console.log(error));
    }, [exam_id]);

    return (
        <Container className="flex-1 !p-0 overflow-y-scroll">
            {examLink && (
                <iframe
                    src={examLink}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="autoplay"
                />
            )}
        </Container>
    );
}
