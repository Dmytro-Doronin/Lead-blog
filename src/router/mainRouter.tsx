import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from '../context/authContext/AuthProvider.tsx';
import { NotificationProvider } from '../context/notificationContext/NotificationProvider.tsx';
import { router } from './router.tsx';

export function Router() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </NotificationProvider>
        </QueryClientProvider>
    );
}
