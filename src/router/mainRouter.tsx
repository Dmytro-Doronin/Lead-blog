import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from '../context/authContext/AuthProvider.tsx';
import { router } from './router.tsx';

export function Router() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />;
        </AuthProvider>
    );
}
