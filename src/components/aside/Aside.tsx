import { NavLink } from 'react-router-dom';

import styles from './aside.module.scss';

export const Aside = () => {
    return (
        <aside className={styles.aside}>
            <NavLink className={styles.link} to="/blogs">
                Blogs
            </NavLink>
            <NavLink className={styles.link} to="/posts">
                Posts
            </NavLink>
        </aside>
    );
};
