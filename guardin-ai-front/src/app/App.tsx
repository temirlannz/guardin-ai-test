import {Routes, Route, Navigate} from "react-router-dom";
import { BaseLayout } from "@/shared/ui/layout/base-layout";
import { LoginPage } from "@/pages/auth/login/page";
import { RegisterPage } from "@/pages/auth/register/page";
import {ProtectedRoute} from "@/app/protected-route.tsx";
import {GuestRoute} from "@/app/guest-route.tsx";
import {HomePage} from "@/pages/home/page.tsx";

export default function App() {
    return (
        <BaseLayout>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </BaseLayout>
    );
}
