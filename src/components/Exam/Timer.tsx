import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Typography } from '@mui/material';
import { formatTime } from './utils';
import { t } from 'i18next';

interface TimerProps {
    timeLeft: number;
    isRunning: boolean;
    hasResult: boolean;
    setTimeLeft: Dispatch<SetStateAction<number>>;
}
export const Timer = ({
    timeLeft,
    isRunning,
    setTimeLeft,
    hasResult,
}: TimerProps) => {
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isRunning && timeLeft > 0 && !hasResult) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, timeLeft, hasResult, setTimeLeft]);

    return (
        <Typography textAlign="center" className="!mb-4" variant="h3">
            {t('exams.exam.time_left')}: {formatTime(timeLeft)}
        </Typography>
    );
};
