import type { LoginType } from '../../api/auth/types.ts';

import { AuthPageWrapper } from '../../components/auth/authPageWrapper/AuthPageWrapper.tsx';
import { LoginForm } from '../../components/auth/loginForm/LoginForm.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';

export const LoginPage = () => {
    const { login, isLocalLoading } = useAuth();
    const onFormSubmit = (data: LoginType) => {
        login(data);
    };

    return (
        <AuthPageWrapper>
            <LoginForm isLoading={isLocalLoading} onSubmit={onFormSubmit} />
        </AuthPageWrapper>
    );
};
