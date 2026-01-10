import { Outlet } from 'react-router-dom';

import { Header } from '../../components/header/Header.tsx';

export function RootLayout() {
    return (
        <div className="root">
            <Header />
            <Outlet />
        </div>
    );
}
