import React from 'react';
import { CircularProgress, Box } from '@mui/material';

<CircularProgress size={60} thickness={5} color="secondary" />;

export const LoadingIndicator = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};
