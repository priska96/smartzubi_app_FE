import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo';
import React from 'react';
import { SwitchLanguageButton } from './components/SwitchLanguageButton';
import { Container } from '@mui/material';
import { useAuthStore /*, isPaying, isLocked */ } from './store';
import { useKeyboardHeight } from './hooks/useKeyboardHeight';

function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuthStore();
    // const isPayingUser = useAuthStore(isPaying);
    // const isLockedUser = useAuthStore(isLocked);
    const keyboardHeight = useKeyboardHeight();

    React.useEffect(() => {
        if (!auth?.user && !auth?.access_token && location.pathname === '/') {
            navigate('/login');
        }
    }, [navigate, auth, location]);

    React.useEffect(() => {
        if (
            auth?.user &&
            auth?.access_token /* && isPayingUser && !isLockedUser*/
        ) {
            navigate('/exams', { replace: true });
        }
    }, [navigate, auth /*, isPayingUser, isLockedUser*/]);

    return (
        <Container
            className={`bg-zinc-50 pt-3 h-[100vh] !px-0 pb-[${keyboardHeight}px]`}
        >
            <Logo />
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
        </Container>
    );
}
export default AppLayout;
