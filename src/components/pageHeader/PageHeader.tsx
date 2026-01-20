import { NavLink } from 'react-router-dom';

import SearchIcon from '../icons/SearchIcon.tsx';
import { Button } from '../ui/button/Button.tsx';
import { SelectComponent, type SelectComponentType } from '../ui/select/SelectComponent.tsx';
import { TextField } from '../ui/textField/TextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './pageHeader.module.scss';

type BaseProps = {
    title: string;
    searchCallback?: (term: string) => void;
};

type ActionProps = {
    action?: {
        label: string;
        to: string;
    };
};

export type SelectHeaderProps<TValue extends string = string> = Omit<
    SelectComponentType<TValue>,
    'variant'
>;

type PageHeaderProps<TValue extends string = string> =
    | (BaseProps & ActionProps & { select: SelectHeaderProps<TValue> })
    | (BaseProps & ActionProps & { select?: undefined });

export const PageHeader = <TValue extends string = string>(props: PageHeaderProps<TValue>) => {
    const { title, searchCallback, action } = props;

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
                {action && (
                    <Button as={NavLink} to={action.to}>
                        {action.label}
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
