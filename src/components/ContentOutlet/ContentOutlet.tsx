import React from 'react';
import { Stack, useTheme, Typography } from '@mui/material';
import { ContentSX } from './Content.styles';

interface ContentOutletProps {
    header?: string;
}
function ContentOutlet({
    children,
    header,
}: React.PropsWithChildren<ContentOutletProps>) {
    const theme = useTheme();
    return (
        <Stack
            gap={3}
            sx={{
                ...ContentSX,
                border: `1px solid ${theme.custom?.border}`,
                background: theme.palette.grey[50],
                justifyContent: 'space-between',
            }}
        >
            {header ? (
                <Typography textAlign="center" variant="h2">
                    {header}
                </Typography>
            ) : null}
            {children}
        </Stack>
    );
}

export default ContentOutlet;
