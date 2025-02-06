import { Container } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/provider/AuthContext';
import BottomBar from './ContentOutlet/BottomBar';
import { Logo } from './Logo';

export function ProtectedRouteLayout() {
    const { user } = useAuth();

    if (!user || Object.keys(user).length === 0) {
        return <Navigate to="/login" />;
    }
    if (!user.is_paying) {
        return <Navigate to="/forbidden-free-member" />;
    }
    if (user.locked) {
        return <Navigate to="/forbidden-locked-member" />;
    }

    return (
        <Container className="bg-zinc-50 pt-3 h-[100vh] !px-0">
            <Logo />
            {/* <Typography textAlign="center" variant="h2">
                LOGO SmartZubi
            </Typography> */}
            <Container
                sx={{
                    paddingX: '8px !important',
                    '@media (min-width: 380px)': {
                        paddingX: '0 !important',
                    },
                }}
                className="bg-white max-w-[700px] max-h-[calc(100vh-110px)] overflow-x-hidden overflow-y-scroll h-full relative"
            >
                <Outlet />
            </Container>
            <BottomBar />
        </Container>
    );
}
