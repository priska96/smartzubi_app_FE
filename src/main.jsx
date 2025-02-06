import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import store from './app/store';
import AppThemeProvider from './themes/AppThemeProvider';
import App from './App';
import './index.css';
import './i18n'; // Import the i18n configuration
import '@stripe/stripe-js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        </Provider>
    </React.StrictMode>
);
