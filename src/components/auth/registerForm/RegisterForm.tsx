import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import type { RegisterTypes } from '../../../api/auth/types.ts';
import type { FormValues } from './registerFormTypes.ts';

import AuthEmail from '../../icons/AuthEmail.tsx';
import Lock from '../../icons/Lock.tsx';
import User from '../../icons/User.tsx';
import { Loader } from '../../loader/Loader.tsx';
import { Button } from '../../ui/button/Button.tsx';
import { ControlledTextField } from '../../ui/controlled/ControlledTextField.tsx';
import { Typography } from '../../ui/typography/Typography.tsx';
import styles from './registerForm.module.scss';
import { signUpSchema } from './registerForm.validation.ts';

type LoginFormType = {
    isLoading: boolean;
    onSubmit: (data: RegisterTypes) => void;
};

export const RegisterForm = ({ onSubmit, isLoading }: LoginFormType) => {
    const { control, handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            login: '',
            email: '',
            password: '',
        },
    });

    const onSubmitForm = (data: FormValues) => {
        onSubmit(data);
        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
            <Typography variant={'h2'}>Registration</Typography>
            <div className={styles.inputGroup}>
                <ControlledTextField
                    label="Login"
                    placeholder="Enter your login"
                    control={control}
                    name="login"
                    Icon={User}
                />

                <ControlledTextField
                    label="Email"
                    placeholder="Enter your email"
                    control={control}
                    name="email"
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
            <Button variant="primary" fullWidth disabled={isLoading} type="submit">
                Registration
            </Button>
            <div className={styles.infoGroup}>
                <Typography className={styles.info} variant="body2">
                    Already have an account?
                </Typography>
                <Button variant="secondary" as={Link} to="/login">
                    <Typography variant="body1">Log in</Typography>
                </Button>
            </div>

            {isLoading && (
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            )}
        </form>
    );
};
