import {LoginForm} from "@/features/auth/login/ui/login-form.tsx";
import {AuthLayout} from "@/shared/ui/layout/auth/auth-layout.tsx";

export const LoginPage = () => {
    return (
        <AuthLayout title='Войти'>
            <LoginForm />
        </AuthLayout>
    );
};
