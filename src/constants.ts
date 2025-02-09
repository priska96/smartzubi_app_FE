declare global {
    interface ImportMeta {
        env: {
            VITE_API_URL: string;
            VITE_DOMAIN: string;
            VITE_STRIPE_API_KEY: string;
            VITE_OPEN_AI_API_KEY: string;
        };
    }
}

export const API_URL = import.meta.env.VITE_API_URL as string;
export const DOMAIN = import.meta.env.VITE_DOMAIN as string;
export const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_API_KEY as string;
export const OPEN_AI_API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY as string;
export const TOKEN_LIMIT = 8192; // limit for (GPT-4)
