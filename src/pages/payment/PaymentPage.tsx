import { Typography, Stack, Container } from '@mui/material';
import { CheckoutForm } from '@/features/payment/CheckoutForm';
import { useAuthUser } from '@/features/authentication/hooks';

function PaymentPage() {
    const user = useAuthUser();

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
