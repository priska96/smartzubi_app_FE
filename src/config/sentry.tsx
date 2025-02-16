import * as Sentry from '@sentry/react';

export const initSentry = async () => {
    try {
        const replay = Sentry.getReplay();
        await replay?.stop();
    } catch (e) {
        console.error('Error stopping replay', e);
    }

    Sentry.init({
        dsn: 'https://1abd9032d68d2719fe78d4ae90946cca@o4508783520120832.ingest.de.sentry.io/4508783523528784',
        integrations: [
            Sentry.browserTracingIntegration(),

            Sentry.replayIntegration({
                networkDetailAllowUrls: [
                    window.location.origin,
                    // 'localhost',
                    'https://smartzubi-frontend-f46741e7a210.herokuapp.com/',
                    'https://smartzubi-backend-9a9dc1a5e4a6.herokuapp.com/',
                ],
            }),
            Sentry.captureConsoleIntegration({
                levels: ['assert', 'error'],
            }),
        ],
        // Tracing
        tracesSampleRate: 0.1, //  Capture 10% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
            // 'localhost',
            'https://smartzubi-frontend-f46741e7a210.herokuapp.com/',
            'https://smartzubi-backend-9a9dc1a5e4a6.herokuapp.com/',
        ],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
};
