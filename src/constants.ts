declare global {
    interface ImportMeta {
        env: {
            VITE_API_URL: string;
            VITE_DOMAIN: string;
        };
    }
}

export const API_URL = import.meta.env.VITE_API_URL as string;
export const DOMAIN = import.meta.env.VITE_DOMAIN as string;
