import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        const result = await register(data.username, data.email, data.password);
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
                label="Username"
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
                label="E-mail"
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
                label="Password"
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
                label="Password (again)"
                variant="outlined"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />

            <ProductDisplay registerForm={registerForm} errors={errors} />

            <Button variant="contained" type="submit">
                Sign Up
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" component="p">
                    Already have an account?
                </Typography>
                <Link
                    variant="body2"
                    sx={{ display: 'inline', ml: 1 }}
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </Link>
            </Box>
        </AuthOutlet>
    );
}

export default Register;
