import React from 'react';
import { CssBaseline } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Routes from './routes';
import AuthProvider from './provider/authProvider';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    'pk_test_51PraP7DQCLG7VmT2cjVzcRaBoMgw8vPZZT4ABeJHdIaQVAd70YkRJSuqitVYK5n6vjr0l4v0YmUWM1K0h3HxOAMD006Hgg8tQb'
);

enum PaymentMode {
    Payment = 'payment',
    Setup = 'setup',
    Subscription = 'subscription',
}

function App() {
    const options = {
        mode: 'subscription' as PaymentMode,
        amount: 500,
        currency: 'eur',
        // passing the client secret obtained from the server
        // clientSecret: CLIENT_SECRET,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <AuthProvider>
                <CssBaseline />
                <Routes />
            </AuthProvider>
        </Elements>
    );
}

export default App;
