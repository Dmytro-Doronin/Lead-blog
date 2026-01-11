import type { LoginType, RegisterTypes, UserType } from './types.ts';

import { apiProtected, apiPublic } from '../api.ts';

export const Login = async (loginData: LoginType) => {
    const response = await apiPublic.post<{ accessToken: string }>('/auth/login', loginData);
    return response.data.accessToken;
};

export const Registration = async (registrationData: RegisterTypes) => {
    const response = await apiPublic.post('/auth/registration', registrationData);
    return response.data;
};

export const Me = async () => {
    const response = await apiProtected.get<UserType>('/auth/me');
    return response.data;
};

export const GetRefreshToken = async () => {
    const response = await apiPublic.post<{ accessToken: string }>('/auth/refresh-token');
    return response.data;
};

export const Logout = async () => {
    await apiProtected.post('/auth/logout');
};
