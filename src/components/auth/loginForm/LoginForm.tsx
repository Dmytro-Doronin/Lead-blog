import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { LoginType } from '../../../api/auth/types.ts';
import type { FormValues } from './loginFormTypes.ts';

import AuthEmail from '../../icons/AuthEmail.tsx';
import Lock from '../../icons/Lock.tsx';
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
    });

    const onSubmitForm = (data: FormValues) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className={styles.inputGroup}>
                <ControlledTextField
                    label="Login"
                    placeholder="Enter your login"
                    control={control}
                    name="login"
                    Icon={AuthEmail}
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
            <Button disabled={isLoading} fullWidth type="submit">
                <Typography variant="body1">Forgot password</Typography>
            </Button>
            <div className={styles.infoGroup}>
                <Button disabled={isLoading} type="submit">
                    <Typography variant="body1">Log in</Typography>
                </Button>
                <Button disabled={isLoading} variant="secondary">
                    <Typography variant="body1">Sign up</Typography>
                </Button>
            </div>
            {isLoading && <Loader />}
        </form>
    );
};
