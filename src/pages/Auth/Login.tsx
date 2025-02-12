import {
    Box,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Link,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthOutlet from './AuthOutlet';
import { loginSchema } from '@/app/api';
import { LoginReqData } from '@/app/api/types';
import { isAxiosError } from 'axios';
import { useLogin } from '@/features/authentication/hooks';
// import ForgotPassword from '@/components/ForgotPassword';

function Login() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginReqData>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();
    const { login } = useLogin();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    // const [open, setOpen] = useState(false);
    const [error, setError] = React.useState('');

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setError('');
    };

    const onSubmit: SubmitHandler<LoginReqData> = async (data) => {
        try {
            const res = await login({
                email: data.email,
                password: data.password,
            });
            console.log(res);
            navigate('/exams', { replace: true });
            window.location.reload(); // forece reload to have correct jwt in headers
        } catch (error) {
            if (isAxiosError(error)) {
                console.error('Login failed', error);
                setError(
                    t(`auth.${error.response?.data?.detail}`) ||
                        'An unknown error occurred'
                );
            } else {
                console.error('Unexpected error', error);
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <AuthOutlet<LoginReqData>
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        >
            <Snackbar
                className="w-full"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={error !== ''}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={handleClose}>
                    {error}
                </Alert>
            </Snackbar>
            {/* <ForgotPassword open={open} setOpen={setOpen} /> */}
            <TextField
                {...register('email')}
                error={!!errors.email}
                helperText={<span>{errors.email?.message as string}</span>}
                type="email"
                label={t('login.email')}
                variant="outlined"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a1a1aa',
                    },
                }}
            />
            <Stack gap={1}>
                <TextField
                    {...register('password')}
                    error={!!errors.password}
                    helperText={
                        <span>{errors.password?.message as string}</span>
                    }
                    type={showPassword ? 'text' : 'password'}
                    label={t('login.password')}
                    variant="outlined"
                    sx={{
                        '& .MuiInputBase-root ': { pr: '4px' },
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#a1a1aa',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {/* <Link
                    variant="body2"
                    textAlign="right"
                    onClick={() => setOpen(true)}
                >
                    {t('login.forgot_password')}
                </Link> */}

                <Button variant="contained" type="submit">
                    {t('login.signIn')}
                </Button>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" component="p">
                    {t('login.no_account')}
                </Typography>
                <Link
                    variant="body2"
                    sx={{ display: 'inline', ml: 1 }}
                    onClick={() => navigate('/register')}
                >
                    {t('login.register_here')}
                </Link>
            </Box>
        </AuthOutlet>
    );
}

export default Login;
