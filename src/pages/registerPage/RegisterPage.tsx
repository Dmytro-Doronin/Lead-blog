import type { RegisterTypes } from '../../api/auth/types.ts';

import { AuthPageWrapper } from '../../components/auth/authPageWrapper/AuthPageWrapper.tsx';
import { RegisterForm } from '../../components/auth/registerForm/RegisterForm.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';

export const RegisterPage = () => {
    const { registration, isLocalLoading } = useAuth();

    const onFormSubmit = (data: RegisterTypes) => {
        registration(data);
    };

    return (
        <AuthPageWrapper>
            <RegisterForm isLoading={isLocalLoading} onSubmit={onFormSubmit} />
        </AuthPageWrapper>
    );
};
