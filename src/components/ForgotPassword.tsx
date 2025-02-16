import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Alert,
    Box,
    CircularProgress,
    Modal,
} from '@mui/material';
import { useForgotPassword } from '@/features/authentication/hooks';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword = ({ open, setOpen }: ForgotPasswordProps) => {
    const { t } = useTranslation();

    const { forgotPassword } = useForgotPassword();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setMessage('');
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = forgotPassword({
                email: email,
            });
            //setMessage(response.data.message);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.detail);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
        setLoading(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="forgot-password-title"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography
                    id="forgot-password-title"
                    variant="h6"
                    component="h2"
                    mb={2}
                >
                    Forgot Password
                </Typography>
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        type="email"
                        label={t('login.email')}
                        variant="outlined"
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#a1a1aa',
                            },
                        }}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={20} />
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ForgotPassword;
