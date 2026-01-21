import { NavLink } from 'react-router-dom';

import styles from './aside.module.scss';

export const Aside = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${styles.link} ${isActive ? styles.active : ''}`;

    return (
        <aside className={styles.aside}>
            <NavLink className={linkClass} to="/blogs" end>
                Blogs
            </NavLink>
            <NavLink className={linkClass} to="/posts" end>
                Posts
            </NavLink>
        </aside>
    );
};
