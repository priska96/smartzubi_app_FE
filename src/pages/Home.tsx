import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/login', { replace: true });
    }, [navigate]);

    return <Container />;
}

export default Home;
