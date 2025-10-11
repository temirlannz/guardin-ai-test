import type { ReactNode } from "react";
import { Card, CardContent } from "@/shared/ui/kit/card";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md p-6 rounded-xl border border-border bg-card shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">{title}</h1>

                <Card className="border-none shadow-none p-0 bg-transparent">
                    <CardContent className="p-0">{children}</CardContent>
                </Card>
            </div>
        </div>
    );
};
