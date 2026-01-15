import SearchIcon from '../icons/SearchIcon.tsx';
import { TextField } from '../ui/textField/TextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './pageHeader.module.scss';

type PageHeaderProps = {
    title: string;
    searchCallback?: (term: string) => void;
};

export const PageHeader = ({ title, searchCallback }: PageHeaderProps) => {
    return (
        <div className={styles.pageHeader}>
            <Typography className={styles.title} variant="h1">
                {title}
            </Typography>
            {searchCallback && (
                <TextField
                    placeholder="Search..."
                    containerClassName={styles.search}
                    onValueChange={searchCallback}
                    Icon={SearchIcon}
                />
            )}
        </div>
    );
};
