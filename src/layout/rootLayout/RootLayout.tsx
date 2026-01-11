import { Outlet } from 'react-router-dom';

import { AppLoader } from '../../components/appLoader/AppLoader.tsx';
import { Header } from '../../components/header/Header.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import styles from './rootLayout.module.scss';

export function RootLayout() {
    const { isAuth, isLoading, user, logout } = useAuth();

    return (
        <div className={styles.rootLayout}>
            <Header isAuth={isAuth} user={user} logout={logout} />
            {isLoading && <AppLoader />}
            <Outlet />
        </div>
    );
}
