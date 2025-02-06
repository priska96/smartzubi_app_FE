import React from 'react';
import { Stack, useTheme } from '@mui/material';
import {
    SubmitHandler,
    FieldValues,
    SubmitErrorHandler,
} from 'react-hook-form';
import { FormSX } from './Auth.styles';

interface AuthOutletProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
    handleSubmit: (
        onValid: SubmitHandler<T>,
        onInvalid?: SubmitErrorHandler<T>
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}
function AuthOutlet<T extends FieldValues>({
    children,
    onSubmit,
    handleSubmit,
}: React.PropsWithChildren<AuthOutletProps<T>>) {
    const theme = useTheme();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                gap={3}
                sx={{
                    ...FormSX,
                    border: `1px solid ${theme.custom!.border}`,
                    background: theme.palette.grey[50],
                }}
            >
                {children}
            </Stack>
        </form>
    );
}

export default AuthOutlet;
