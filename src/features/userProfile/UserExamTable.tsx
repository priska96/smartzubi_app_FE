import { UserExam } from '@/app/api/models';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserExamTableProps {
    exams: UserExam[];
}
function UserExamTable({ exams }: UserExamTableProps) {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Prüfung</TableCell>
                        <TableCell>abgelegt am</TableCell>
                        <TableCell>Punkte</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exams.map((exam) => (
                        <TableRow
                            key={exam.id}
                            className="cursor-pointer"
                            onClick={() =>
                                navigate(
                                    `/exams/${exam.exam_id}?user_exam=${exam.id}`
                                )
                            }
                        >
                            <TableCell>{exam.title}</TableCell>
                            <TableCell>
                                {new Date(exam.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                {exam.score} / {exam.score_total}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserExamTable;
