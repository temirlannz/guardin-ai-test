import {useSession} from "@/features/auth/model/use-session.ts";

export const HomePage = () => {
    const { user, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
            <h1 className="text-2xl font-semibold">
                Привет, {user?.first_name} 👋
            </h1>
            <pre className="p-4 bg-muted text-left rounded-lg text-sm overflow-x-auto w-[600px] max-w-full">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    );
};
