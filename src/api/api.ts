import axios from 'axios';
import Cookies from 'js-cookie';

import { GetRefreshToken } from './auth/AuthApi.ts';

type QueueItem = {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
};

//https://blog-backend-nest.vercel.app

export const apiPublic = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
});

export const apiProtected = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
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
        const originalRequest = error.config;

        if (String(originalRequest.url).includes('/auth/refresh-token')) {
            Cookies.remove('accessToken');
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
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
