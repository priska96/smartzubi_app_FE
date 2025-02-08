import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { createClientSecret } from '@/app/api';
import { User } from '@/app/api/models';
import { useAuthUser } from '../authentication/hooks';
import { DOMAIN } from '@/constants';
//import { StripeError } from '@stripe/stripe-js';

export function CheckoutForm() {
    const user = useAuthUser();
    const stripe = useStripe();
    const elements = useElements();

    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    const handleError = (/*error: StripeError*/) => {
        setIsSubmitting(false);
        // setErrorMessage(error.message ?? "");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements || isSubmitting) {
            // Stripe.js hasn't yet loaded.
            // or form was already submitted.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsSubmitting(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(/*submitError*/);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await createClientSecret({
            user_id: (user as User).id,
            name: 'Pro Member',
            price: 500,
            currency: 'eur',
        });

        console.log(res);

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: res.client_secret,
            confirmParams: {
                return_url: `${DOMAIN}/payment/success`,
            },
        });

        if (error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe || isSubmitting}>Submit</button>
        </form>
    );
}
