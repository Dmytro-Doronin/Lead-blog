import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

import type { LoginType, RegisterTypes, UserType } from '../../api/auth/types.ts';

import { Login, Logout, Me, Registration } from '../../api/auth/AuthApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../../hooks/useNotification.tsx';
import { AuthContext } from './AuthContext.tsx';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLocalLoading, setIsLocalLoading] = useState(false);
    const { notify } = useNotification();

    const isAuth = !!user;

    const fetchMe = useCallback(
        async (silent = false) => {
            try {
                const user = await Me();
                setUser(user);
            } catch (err) {
                setUser(null);
                if (!silent) {
                    const msg = getErrorMessage(err);
                    notify({ variant: 'error', message: msg || 'Unknown error' });
                }
            } finally {
                setIsLoading(false);
            }
        },
        [notify],
    );

    const login = async (data: LoginType) => {
        setIsLocalLoading(true);
        try {
            const accessToken = await Login(data);
            Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
            await fetchMe();
            notify({ message: 'Login successful', variant: 'success', duration: 4000 });
            setIsLocalLoading(false);
        } catch (err) {
            const msg = getErrorMessage(err);
            notify({ variant: 'error', message: msg || 'Unknown error' });
            setIsLocalLoading(false);
        }
    };

    const registration = async (data: RegisterTypes) => {
        setIsLocalLoading(true);
        try {
            const request = await Registration(data);
            if (request !== null) {
                notify({ message: 'Registration successful', variant: 'success', duration: 4000 });
            }
            setIsLocalLoading(false);
        } catch (err) {
            const msg = getErrorMessage(err);
            notify({ variant: 'error', message: msg || 'Unknown error' });
            setIsLocalLoading(false);
        }
    };

    const logout = async () => {
        try {
            await Logout();
            Cookies.remove('accessToken');
            setUser(null);
            notify({ message: 'Logout successful', variant: 'success', duration: 4000 });
        } catch (err) {
            const msg = getErrorMessage(err);
            notify({ variant: 'error', message: msg || 'Unknown error' });
        }
    };

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            fetchMe(true);
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
