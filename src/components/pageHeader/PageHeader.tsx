import { NavLink } from 'react-router-dom';

import SearchIcon from '../icons/SearchIcon.tsx';
import { Button } from '../ui/button/Button.tsx';
import { TextField } from '../ui/textField/TextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './pageHeader.module.scss';

type PageHeaderProps = {
    title: string;
    searchCallback?: (term: string) => void;
    isAuth?: boolean;
};

export const PageHeader = ({ title, searchCallback, isAuth }: PageHeaderProps) => {
    return (
        <div className={styles.pageHeader}>
            <Typography className={styles.title} variant="h1">
                {title}
            </Typography>
            <div className={styles.searchWrapper}>
                {searchCallback && (
                    <TextField
                        placeholder="Search..."
                        containerClassName={styles.search}
                        onValueChange={searchCallback}
                        Icon={SearchIcon}
                    />
                )}
                {isAuth && (
                    <Button as={NavLink} to="/blogs/create">
                        Add new blog
                    </Button>
                )}
            </div>
        </div>
    );
};
