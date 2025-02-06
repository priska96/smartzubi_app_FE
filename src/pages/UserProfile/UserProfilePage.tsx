import { Typography, Stack, Container } from '@mui/material';
import { useAuth } from '@/provider/AuthContext';
import UserProfile from '@/features/userProfile/UserProfile';

function UserProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-4">
            <Stack gap={1} my={2}>
                <Typography textAlign="center" variant="subtitle1">
                    Profil
                </Typography>
            </Stack>
            <UserProfile />
        </Container>
    );
}

export default UserProfilePage;
