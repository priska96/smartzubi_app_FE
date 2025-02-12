import { Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomBar from './ContentOutlet/BottomBar';
import { Logo } from './Logo';
import { useAuthUser } from '@/features/authentication/hooks';
import { /*isPaying,*/ isLocked, useAuthStore } from '@/store';
import { SwitchLanguageButton } from './SwitchLanguageButton';

export function ProtectedRouteLayout() {
    const user = useAuthUser();
    // const isPayingUser = useAuthStore(isPaying);
    const isLockedUser = useAuthStore(isLocked);

    const navigate = useNavigate();

    if (!user || Object.keys(user).length === 0) {
        navigate('/login');
        return;
    }
    // if (!isPayingUser) {
    //     navigate('/forbidden-free-member');
    //     return;
    // }
    if (isLockedUser) {
        navigate('/forbidden-locked-member');
        return;
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
                className="bg-white max-w-[700px] max-h-[calc(100vh-146px)] overflow-x-hidden overflow-y-scroll h-full relative"
            >
                <SwitchLanguageButton />
                <Outlet />
            </Container>
            <BottomBar />
        </Container>
    );
}
