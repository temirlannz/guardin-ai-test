import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/shared/ui/kit/spinner";
import {useSession} from "@/features/auth/model/use-session.ts";

export const ProtectedRoute = () => {
    const { isAuth, isPending, isError } = useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (isError || !isAuth) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
