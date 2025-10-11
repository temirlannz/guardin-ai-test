import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { queryClient } from "@/shared/api/query-client";
import { SessionProvider } from "./session-provider";

export function Providers({ children }: { children?: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SessionProvider>{children}</SessionProvider>
            </BrowserRouter>

            <Toaster position="top-center" richColors />
        </QueryClientProvider>
    );
}
