import { NavLink } from 'react-router-dom';

import type { UserType } from '../../api/auth/types.ts';

import { Logo } from '../logo/Logo.tsx';
import { Button } from '../ui/button/Button.tsx';
import styles from './header.module.scss';

type HeaderProps = {
    isAuth: boolean;
    user: UserType | null;
    logout: () => Promise<void>;
};

export const Header = ({ isAuth, user, logout }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <Logo />
                    {isAuth ? (
                        <div>
                            <div className={styles.userBlock}>{user?.email}</div>
                            <Button onClick={() => logout()} variant="secondary">
                                Log out
                            </Button>
                        </div>
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
