import type { RegisterTypes } from '../../api/auth/types.ts';

import { AuthPageWrapper } from '../../components/auth/authPageWrapper/AuthPageWrapper.tsx';
import { RegisterForm } from '../../components/auth/registerForm/RegisterForm.tsx';

export const RegisterPage = () => {
    const onFormSubmit = async (data: RegisterTypes) => {
        console.log('onFormSubmit', data);
    };

    return (
        <AuthPageWrapper>
            <RegisterForm isLoading={false} onSubmit={onFormSubmit} />
        </AuthPageWrapper>
    );
};
