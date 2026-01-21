import { type ChangeEvent, type ComponentPropsWithoutRef, forwardRef, useState } from 'react';

import { Typography } from '../typography/Typography.tsx';
import styles from './textArea.module.scss';

export type TextAreaFieldProps = {
    onValueChange?: (value: string) => void;
    containerProps?: string;
    errorMessage?: string;
    label?: string;
} & ComponentPropsWithoutRef<'textarea'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
    (
        {
            className,
            errorMessage,
            placeholder,
            containerProps,
            label,
            onChange,
            onValueChange,
            ...restProps
        },
        ref,
    ) => {
        const [containerFocused, setContainerFocused] = useState(false);

        const containerTypeStyle = containerFocused
            ? `${styles.fieldContainer} ${styles.containerFocused}`
            : styles.fieldContainer;
        const field = !!errorMessage && styles.error;

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
        };

        const focusedHandler = () => {
            setContainerFocused(true);
        };

        const unFocusedHandler = () => {
            setContainerFocused(false);
        };

        return (
            <div className={`${styles.root} ${containerProps}`}>
                {label && (
                    <Typography variant="body2" as="label" className={styles.label}>
                        {label}
                    </Typography>
                )}
                <div
                    onFocus={focusedHandler}
                    onBlur={unFocusedHandler}
                    className={containerTypeStyle}
                >
                    <textarea
                        className={`${field} ${styles.field} ${className}`}
                        placeholder={placeholder}
                        ref={ref}
                        onChange={handleChange}
                        rows={5}
                        {...restProps}
                    />
                </div>

                <Typography variant="body2" className="error">
                    {errorMessage}
                </Typography>
            </div>
        );
    },
);
