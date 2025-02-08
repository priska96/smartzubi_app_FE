import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import UserExamTable from './UserExamTable';
import { getUserExams } from '@/app/api';
import { UserExam, User } from '../../app/api/models';
import { useAuthUser } from '../authentication/hooks';

function UserProfile() {
    const user = useAuthUser();
    const [exams, setExams] = useState<UserExam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getUserExams((user as User).id);
                setExams(data);
            } catch (error) {
                console.error('Failed to fetch exams', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchQuizzes();
        }
    }, [user]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {(user as User).username}s Profil
            </Typography>
            <Typography variant="h6" gutterBottom>
                Abgelegte Tests
            </Typography>
            <UserExamTable exams={exams} />
        </Container>
    );
}

export default UserProfile;
