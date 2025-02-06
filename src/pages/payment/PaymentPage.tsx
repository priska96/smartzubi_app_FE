import { Typography, Stack, Container } from '@mui/material';
import { useAuth } from '@/provider/AuthContext';
import { CheckoutForm } from '@/features/payment/CheckoutForm';

function PaymentPage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-4">
            <Stack gap={1} my={2}>
                <Typography textAlign="center" variant="subtitle1">
                    Stripe Payment Test
                </Typography>
            </Stack>
            <CheckoutForm />
        </Container>
    );
}

export default PaymentPage;
