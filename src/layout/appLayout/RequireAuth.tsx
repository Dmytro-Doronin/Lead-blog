import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuthContext.tsx';

export const RequireAuth = () => {
    const { isAuth, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return null;
    }

    if (!isAuth) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};
