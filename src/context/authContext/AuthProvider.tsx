import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

import type { RegisterTypes, UserType } from '../../api/auth/types.ts';

import { Login, Logout, Me, Registration } from '../../api/auth/AuthApi.ts';
import { AuthContext } from './AuthContext.tsx';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLocalLoading, setIsLocalLoading] = useState(false);

    const isAuth = !!user;

    const fetchMe = useCallback(async () => {
        try {
            const user = await Me();
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (data: { login: string; password: string }) => {
        setIsLocalLoading(true);
        try {
            const accessToken = await Login(data);
            Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
            await fetchMe();
            setIsLocalLoading(false);
        } catch {
            setIsLocalLoading(false);
        }
    };

    const registration = async (data: RegisterTypes) => {
        setIsLocalLoading(true);
        try {
            await Registration(data);
            setIsLocalLoading(false);
        } catch {
            setIsLocalLoading(false);
        }
    };

    const logout = async () => {
        try {
            await Logout();
            Cookies.remove('accessToken');
            setUser(null);
        } catch {
            throw new Error('Logout Error');
        }
    };

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            fetchMe();
        } else {
            setIsLoading(false);
        }
    }, [fetchMe]);

    return (
        <AuthContext.Provider
            value={{ user, isAuth, isLoading, login, logout, isLocalLoading, registration }}
        >
            {children}
        </AuthContext.Provider>
    );
};
