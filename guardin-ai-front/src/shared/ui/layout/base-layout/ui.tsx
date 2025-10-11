import type { ReactNode } from "react";
import { Header } from "@/widgets/header";

export const BaseLayout = ({ children }: { children?: ReactNode }) => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main>
            {children}
        </main>
    </div>
);
