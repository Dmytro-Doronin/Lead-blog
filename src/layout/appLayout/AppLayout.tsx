import { Outlet } from 'react-router-dom';

import { Aside } from '../../components/aside/Aside.tsx';
import styles from './appLayout.module.scss';
export const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Aside />

                    <main className={styles.main}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
