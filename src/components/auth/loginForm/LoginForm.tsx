import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import type { LoginType } from '../../../api/auth/types.ts';
import type { FormValues } from './loginFormTypes.ts';

import Lock from '../../icons/Lock.tsx';
import User from '../../icons/User.tsx';
import { Loader } from '../../loader/Loader.tsx';
import { Button } from '../../ui/button/Button.tsx';
import { ControlledTextField } from '../../ui/controlled/ControlledTextField.tsx';
import { Typography } from '../../ui/typography/Typography.tsx';
import styles from './loginForm.module.scss';
import { loginSchema } from './loginForm.validation.ts';

type LoginFormType = {
    isLoading: boolean;
    onSubmit: (data: LoginType) => void;
};

export const LoginForm = ({ onSubmit, isLoading }: LoginFormType) => {
    const { control, handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            loginOrEmail: '',
            password: '',
        },
    });

    const onSubmitForm = (data: FormValues) => {
        onSubmit(data);
        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
            <Typography variant={'h2'}>Login</Typography>
            <div className={styles.inputGroup}>
                <ControlledTextField
                    label="Login or Email"
                    placeholder="Enter your login or email"
                    control={control}
                    name="loginOrEmail"
                    Icon={User}
                />
                <ControlledTextField
                    label="Password"
                    placeholder="Enter your password"
                    control={control}
                    name="password"
                    type="password"
                    Icon={Lock}
                />
            </div>
            <div className={styles.infoGroup}>
                <Button disabled={isLoading} type="submit">
                    <Typography variant="body1">Log in</Typography>
                </Button>
                <Button as={NavLink} to="/register" variant="secondary" type="button">
                    <Typography variant="body1">Sign up</Typography>
                </Button>
            </div>
            {isLoading && <Loader />}
        </form>
    );
};
