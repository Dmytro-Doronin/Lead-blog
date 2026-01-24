import axios from 'axios';
import Cookies from 'js-cookie';

import { GetRefreshToken } from './auth/authApi.ts';
import { triggerLogout } from './auth/logoutBus.ts';
const baseURL = import.meta.env.VITE_SERVER_URL;
type QueueItem = {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
};

export const apiPublic = axios.create({
    baseURL: baseURL,
    withCredentials: false,
});

export const apiProtected = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10_000,
});

apiProtected.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiProtected.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }
        const originalRequest = error.config;

        if (String(originalRequest.url).includes('/auth/refresh-token')) {
            Cookies.remove('accessToken');
            triggerLogout();
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + String(token);
                        return apiProtected(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshResponse = await GetRefreshToken();
                const newAccessToken = refreshResponse.accessToken;

                Cookies.set('accessToken', newAccessToken, {
                    secure: true,
                    sameSite: 'Strict',
                });

                apiProtected.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                processQueue(null, newAccessToken);

                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return apiProtected(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                Cookies.remove('accessToken');
                triggerLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
