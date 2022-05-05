import React, { createContext, useEffect, useState } from 'react';

type ChildProvider = {
    children: React.ReactNode;
};

type AuthContextProps = {
    authToken: string;
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
    accessToken: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextProps>({
    authToken: '',
    accessToken: '',
    setAuthToken: () => '',
    setAccessToken: () => ''
});

const AuthContextProvider = ({ children }: ChildProvider) => {
    const [authToken, setAuthToken] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        token && setAccessToken(token);
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
