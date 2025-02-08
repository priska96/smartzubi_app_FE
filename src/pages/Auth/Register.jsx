import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    registerSchema,
    createCheckoutSession,
    register,
    FREE_MEMBERSHIP,
    STANDARD_MONTHLY,
} from '@/app/api';
import AuthOutlet from './AuthOutlet';
import { ProductDisplay } from '@/features/payment/ProductDisplay';

function Register() {
    const { t } = useTranslation();

    const {
        register: registerForm,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        const result = await register({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        const res = await createCheckoutSession({
            lookup_key: data.free_membership
                ? FREE_MEMBERSHIP
                : STANDARD_MONTHLY,
            email: data.email,
            user_id: result.user_id,
        });
        window.open(res.checkout_session_url, '_top');
    };

    return (
        <AuthOutlet onSubmit={onSubmit} handleSubmit={handleSubmit}>
            <TextField
                {...registerForm('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
                required
                label={t('register.username')}
                variant="outlined"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />
            <TextField
                {...registerForm('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                type="email"
                label={t('register.email')}
                variant="outlined"
                autoComplete="off"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />
            <TextField
                {...registerForm('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                required
                type="password"
                label={t('register.password')}
                variant="outlined"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />
            <TextField
                {...registerForm('passwordConf')}
                error={!!errors.passwordConf}
                helperText={errors.passwordConf?.message}
                required
                type="password"
                label={t('register.password_conf')}
                variant="outlined"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />

            <ProductDisplay registerForm={registerForm} errors={errors} />

            <Button variant="contained" type="submit">
                {t('register.signUp')}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" component="p">
                    {t('register.have_account')}
                </Typography>
                <Link
                    variant="body2"
                    sx={{ display: 'inline', ml: 1 }}
                    onClick={() => navigate('/login')}
                >
                    {t('register.signIn')}
                </Link>
            </Box>
        </AuthOutlet>
    );
}

export default Register;
