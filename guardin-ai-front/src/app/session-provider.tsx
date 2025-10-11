import {type ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {authControllerUserProfile} from "@/shared/api/auth/user-profile.ts";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["user", "profile"],
            queryFn: authControllerUserProfile,
            retry: false,
        });
    }, [queryClient]);

    return <>{children}</>;
};
