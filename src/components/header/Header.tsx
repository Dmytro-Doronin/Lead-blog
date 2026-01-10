import { Logo } from '../logo/Logo.tsx';
import { Button } from '../ui/button/Button.tsx';
import styles from './header.module.scss';

export const Header = () => {
    const isAuth = false;

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <Logo />
                    {isAuth ? (
                        <div className={styles.userBlock}>User</div>
                    ) : (
                        <div className={styles.btnGroup}>
                            <Button value="primary">Sign In</Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
