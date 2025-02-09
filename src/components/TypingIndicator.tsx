import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useTranslation } from 'react-i18next';

const dotsAnimation = keyframes`
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
`;

export const TypingIndicator = () => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                backgroundColor: '#f1f1f1',
                borderRadius: '8px',
                width: 'fit-content',
            }}
        >
            <Typography variant="body1">
                {t('chatbot.typing_indicator')}
            </Typography>
            <Box
                component="span"
                sx={{
                    display: 'inline-block',
                    width: '20px',
                    '::after': {
                        content: '"."',
                        animation: `${dotsAnimation} 1.5s infinite steps(1, end)`,
                    },
                }}
            />
        </Box>
    );
};
