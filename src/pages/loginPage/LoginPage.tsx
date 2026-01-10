import type { LoginType } from '../../api/auth/types.ts';

import { AuthPageWrapper } from '../../components/auth/authPageWrapper/AuthPageWrapper.tsx';
import { LoginForm } from '../../components/auth/loginForm/LoginForm.tsx';

export const LoginPage = () => {
    const onFormSubmit = async (data: LoginType) => {
        console.log('onFormSubmit', data);
    };

    return (
        <AuthPageWrapper>
            <LoginForm isLoading={false} onSubmit={onFormSubmit} />
        </AuthPageWrapper>
    );
};
