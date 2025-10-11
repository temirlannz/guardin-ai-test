import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/shared/ui/kit/spinner";
import {useSession} from "@/features/auth/model/use-session.ts";

export const GuestRoute = () => {
    const { isAuth, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner />
            </div>
        );
    }

    // Если уже вошёл → отправляем в профиль
    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
