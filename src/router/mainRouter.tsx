import { RouterProvider } from 'react-router-dom';

import { router } from './router.tsx';

export function Router() {
    return <RouterProvider router={router} />;
}
