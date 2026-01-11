import {
    type ComponentProps,
    type ComponentPropsWithoutRef,
    forwardRef,
    type ForwardRefExoticComponent,
    type MemoExoticComponent,
    type RefAttributes,
    type SVGProps,
    useState,
} from 'react';
import * as React from 'react';

import { Typography } from '../typography/Typography.tsx';
import styles from './textField.module.scss';

export type TextFieldProps = {
    onValueChange?: (value: string) => void;
    containerProps?: string;
    errorMessage?: string;
    label?: string;
    iconClassName?: string;
    Icon?: MemoExoticComponent<
        ForwardRefExoticComponent<
            Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
        >
    >;
} & ComponentPropsWithoutRef<'input'>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            errorMessage,
            Icon,
            placeholder,
            type,
            containerProps,
            label,
            onChange,
            onValueChange,
            iconClassName,
            ...restProps
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const [containerFocused, setContainerFocused] = useState(false);
        const isShowPasswordButtonShown = type === 'password';
        const inputRef = React.useRef<HTMLInputElement>(null);
        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
        const finalType = getFinalType(type, showPassword);
        const containerTypeStyle = containerFocused
            ? `${styles.fieldContainer} ${styles.containerFocused}`
            : styles.fieldContainer;
        const field = !!errorMessage && styles.error;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <>
                <div
                    className={`${styles.root} ${containerProps}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <div
                        onFocus={focusedHandler}
                        onBlur={unFocusedHandler}
                        className={containerTypeStyle}
                    >
                        <div className={styles.inputContainer}>
                            {label && (
                                <Typography variant="body2" as="label" className={styles.label}>
                                    {label}
                                </Typography>
                            )}
                            <input
                                ref={inputRef}
                                className={`${field} ${styles.field} ${className}`}
                                placeholder={placeholder}
                                type={finalType}
                                onChange={handleChange}
                                autoComplete={type === 'password' ? 'off' : undefined}
                                {...restProps}
                            />
                        </div>
                        {Icon && <Icon className={`${styles.icon} ${iconClassName}`} />}
                        {isShowPasswordButtonShown && (
                            <button
                                className={styles.showPassword}
                                type={'button'}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {/*{showPassword ? <ClosedEye /> : <Eye />}*/}
                            </button>
                        )}
                    </div>
                </div>
                <span className={errorMessage ? 'error' : ''}>{errorMessage}</span>
            </>
        );
    },
);

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
    if (type === 'password' && showPassword) {
        return 'text';
    }

    return type;
}
