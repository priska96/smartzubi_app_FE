import { api, apiAuth } from './axiosInstance';

export const createClientSecret = async ({
    user_id,
    name,
    price,
    currency,
}: {
    user_id: number | string;
    name: string;
    price: number | string;
    currency: string;
}) => {
    try {
        const response = await apiAuth.post(`/api/payment/create-intent`, {
            user_id,
            name,
            price,
            currency,
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const createCheckoutSession = async ({
    lookup_key, // price
    email,
    user_id,
}: {
    lookup_key: string;
    email: string;
    user_id: number;
}) => {
    try {
        const response = await api.post(
            `/api/payment/create-checkout-session`,
            {
                lookup_key,
                email,
                user_id,
            }
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getAllStripeProducts = async ({
    lookup_key,
}: {
    lookup_key: string[];
}) => {
    try {
        const response = await api.post(`/api/payment/get-stripe-products`, {
            lookup_key,
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getCustomerBySessionId = async ({
    session_id,
}: {
    session_id: string;
}) => {
    try {
        const response = await api.get(
            `/api/payment/get-customer/session_id/${session_id}`
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};
