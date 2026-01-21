import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import type { UserType } from '../../api/auth/types.ts';

import { Logo } from '../logo/Logo.tsx';
import { UserBlockSkeleton } from '../skeletons/userBlockSkeletons/UserBlockSkeleton.tsx';
import { Button } from '../ui/button/Button.tsx';
import styles from './header.module.scss';

type HeaderProps = {
    isAuth: boolean;
    user: UserType | null;
    loading: boolean;
    logout: () => Promise<void>;
};

export const Header = ({ isAuth, user, logout, loading }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    const showBurger = useMemo(() => {
        return pathname.startsWith('/blogs') || pathname.startsWith('/posts');
    }, [pathname]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const AuthActions = (
        <>
            {isAuth ? (
                <div className={styles.userBlockMenu}>
                    <div className={styles.email}>{user?.email}</div>
                    <Button onClick={() => logout()} variant="secondary">
                        Log out
                    </Button>
                </div>
            ) : loading ? (
                <UserBlockSkeleton />
            ) : (
                <div className={styles.btnGroup}>
                    <Button as={NavLink} to="/login" variant="primary">
                        Sign In
                    </Button>
                </div>
            )}
        </>
    );

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <NavLink to="/blogs" className={styles.logoLink}>
                        <Logo />
                    </NavLink>

                    <div className={styles.desktopOnly}>
                        {isAuth ? (
                            <div className={styles.userBlock}>
                                <div>{user?.email}</div>
                                <Button onClick={() => logout()} variant="secondary">
                                    Log out
                                </Button>
                            </div>
                        ) : loading ? (
                            <UserBlockSkeleton />
                        ) : (
                            <div className={styles.btnGroup}>
                                <Button as={NavLink} to="/login" variant="primary">
                                    Sign In
                                </Button>
                            </div>
                        )}
                    </div>

                    {showBurger && (
                        <button
                            type="button"
                            className={styles.burger}
                            aria-label="Open menu"
                            aria-expanded={open}
                            onClick={() => setOpen(true)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    )}
                </div>
            </div>

            <div
                className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
                onClick={() => setOpen(false)}
            />

            <aside
                className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
                aria-hidden={!open}
            >
                <div className={styles.drawerHeader}>
                    <NavLink to="/blogs" className={styles.drawerLogo}>
                        <Logo />
                    </NavLink>

                    <button
                        type="button"
                        className={styles.close}
                        aria-label="Close menu"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/blogs"
                        className={({ isActive }) => (isActive ? styles.active : '')}
                    >
                        Blogs
                    </NavLink>
                    <NavLink
                        to="/posts"
                        className={({ isActive }) => (isActive ? styles.active : '')}
                    >
                        Posts
                    </NavLink>
                </nav>

                <div className={styles.divider} />

                {AuthActions}
            </aside>
        </header>
    );
};
