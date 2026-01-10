import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: ReactNode }) {
    const location = useLocation();

    const token = true;

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
}
