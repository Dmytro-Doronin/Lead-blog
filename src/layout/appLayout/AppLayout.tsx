import { Outlet, NavLink } from 'react-router-dom';

import styles from './appLayout.module.scss';
export const AppLayout = () => {
    return (
        <div className="container">
            <div className={styles.wrapper}>
                <aside className={styles.aside}>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/posts">Posts</NavLink>
                </aside>

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
