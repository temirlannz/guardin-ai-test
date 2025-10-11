import {RegisterForm} from "@/features/auth/register/ui/register-form.tsx";
import {AuthLayout} from "@/shared/ui/layout/auth/auth-layout.tsx";

export const RegisterPage = () => {
    return (
        <AuthLayout title='Регистрация'>
            <RegisterForm />
        </AuthLayout>
    );
};
