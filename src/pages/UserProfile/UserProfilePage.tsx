import { Typography, Stack, Container } from '@mui/material';
import UserProfile from '@/features/userProfile/UserProfile';
import { useAuthUser } from '@/features/authentication/hooks';

function UserProfilePage() {
    const user = useAuthUser();

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
