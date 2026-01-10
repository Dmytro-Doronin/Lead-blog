import { Outlet } from 'react-router-dom';

import { Header } from '../../components/header/Header.tsx';
import styles from './rootLayout.module.scss';

export function RootLayout() {
    return (
        <div className={styles.rootLayout}>
            <Header />
            <Outlet />
        </div>
    );
}
