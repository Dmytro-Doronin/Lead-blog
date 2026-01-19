import { NavLink } from 'react-router-dom';

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
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <NavLink to="/blogs">
                        <Logo />
                    </NavLink>

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
            </div>
        </header>
    );
};
