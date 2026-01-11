import { createContext } from 'react';

import type { RegisterTypes, UserType, LoginType } from '../../api/auth/types.ts';

type AuthContextType = {
    user: UserType | null;
    isAuth: boolean;
    isLoading: boolean;
    registration: (data: RegisterTypes) => Promise<void>;
    login: (data: LoginType) => Promise<void>;
    logout: () => Promise<void>;
    isLocalLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
