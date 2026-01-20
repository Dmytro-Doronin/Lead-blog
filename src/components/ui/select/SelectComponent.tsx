import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import * as React from 'react';

import { Typography } from '../typography/Typography.tsx';
import styles from './select.module.scss';

export type Option<TValue extends string = string> = {
    label: string;
    value: TValue;
};
export type variantType = 'pagination' | 'simple';

const SelectItem = React.forwardRef<
    React.ComponentRef<typeof Select.Item>,
    React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className={`${styles.SelectItem} ${className}`} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export type SelectComponentType<TValue extends string = string> = Omit<
    React.ComponentPropsWithoutRef<typeof Select.Root>,
    'children' | 'value' | 'defaultValue' | 'onValueChange'
> & {
    onChange: (item: TValue) => void;
    defaultValue: TValue;
    options: readonly Option<TValue>[];
    variant: variantType;
    errorMessage?: string;
    className?: string;
};

export const SelectComponent = <TValue extends string = string>({
    onChange,
    defaultValue,
    options,
    ...props
}: SelectComponentType<TValue>) => {
    return (
        <Select.Root
            {...props}
            defaultValue={defaultValue}
            onValueChange={(v) => onChange(v as TValue)}
        >
            <Select.Trigger className={`${styles.SelectTrigger} ${styles[props.variant]}`}>
                <Select.Value defaultValue={defaultValue} placeholder={defaultValue} />
                <Select.Icon className={styles.SelectIcon}>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content side="bottom" position={'popper'} className={styles.SelectContent}>
                    <Select.ScrollUpButton className={styles.SelectScrollButton}>
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className={styles.SelectViewport}>
                        <Select.Group className={styles.SelectGroup}>
                            {options.map((item) => {
                                return (
                                    <SelectItem key={item.label} value={item.value}>
                                        <Typography
                                            className={styles.selectTypography}
                                            variant={'body1'}
                                        >
                                            {item.label}
                                        </Typography>
                                    </SelectItem>
                                );
                            })}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className={styles.SelectScrollButton}>
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};
