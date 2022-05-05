import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwindcss/styles.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContextProvider from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
