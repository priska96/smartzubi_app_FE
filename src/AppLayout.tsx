import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo';
import React from 'react';
import { SwitchLanguageButton } from './components/SwitchLanguageButton';
import { Container } from '@mui/material';

function AppLayout() {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/login', { replace: true });
    }, [navigate]);

    return (
        <Container className="bg-zinc-50 pt-3 h-[100vh] !px-0">
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
