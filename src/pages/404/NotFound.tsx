import { NavLink } from 'react-router-dom';

import { Button } from '../../components/ui/button/Button.tsx';
import { Typography } from '../../components/ui/typography/Typography.tsx';
import styles from './notFound.module.scss';

export const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <Typography variant="h2">
                <span className={styles.number}>404 |</span> Page not found
            </Typography>
            <Button as={NavLink} to="/blogs">
                Back to blogs
            </Button>
        </div>
    );
};
