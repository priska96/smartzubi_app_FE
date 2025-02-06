import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { getExams } from '@/app/api';
import { Exam } from '@/app/api/models';

function ExamList() {
    const navigate = useNavigate();
    const [exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        getExams()
            .then((response) => setExams(response))
            .catch((error) => console.log('examlist', error));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {exams &&
                        exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell
                                    className="cursor-pointer"
                                    onClick={() =>
                                        navigate(`/exams/${exam.id}`)
                                    }
                                >
                                    {exam.title}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="inherit"
                                        onClick={() =>
                                            navigate(`/exams/view/${exam.id}`)
                                        }
                                    >
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ExamList;
