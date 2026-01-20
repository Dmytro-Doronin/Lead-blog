import { NavLink } from 'react-router-dom';

import SearchIcon from '../icons/SearchIcon.tsx';
import { Button } from '../ui/button/Button.tsx';
import { SelectComponent, type SelectComponentType } from '../ui/select/SelectComponent.tsx';
import { TextField } from '../ui/textField/TextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './pageHeader.module.scss';

type BaseProps = {
    title: string;
    shortTitle: string;
    link: string;
    searchCallback?: (term: string) => void;
    isAuth?: boolean;
};

export type SelectHeaderProps<TValue extends string = string> = Omit<
    SelectComponentType<TValue>,
    'variant'
>;

type PageHeaderProps<TValue extends string = string> =
    | (BaseProps & { select: SelectHeaderProps<TValue> })
    | (BaseProps & { select?: undefined });

export const PageHeader = <TValue extends string = string>(props: PageHeaderProps<TValue>) => {
    const { title, searchCallback, isAuth, shortTitle, link } = props;

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
                {isAuth && shortTitle === 'blog' && (
                    <Button as={NavLink} to={link}>
                        Add new {shortTitle}
                    </Button>
                )}
                {props.select && (
                    <SelectComponent
                        variant="simple"
                        onChange={props.select.onChange}
                        defaultValue={props.select.defaultValue}
                        options={props.select.options}
                    />
                )}
            </div>
        </div>
    );
};
