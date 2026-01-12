import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from '../context/authContext/AuthProvider.tsx';
import { NotificationProvider } from '../context/notificationContext/NotificationProvider.tsx';
import { router } from './router.tsx';

export function Router() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </NotificationProvider>
    );
}
