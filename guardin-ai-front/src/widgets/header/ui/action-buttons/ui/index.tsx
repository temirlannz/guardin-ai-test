import {useSession} from "@/features/auth/model/use-session.ts";
import {Link} from "react-router-dom";
import {LogIn, LogOut, UserRound} from "lucide-react";
import {Button} from "@/shared/ui/kit/button.tsx";
import {Spinner} from "@/shared/ui/kit/spinner.tsx";
import {useLogout} from "@/features/auth/model/use-logout.ts";

export const ActionButtons = () => {
  const { isAuth, user } = useSession();
  const { isPending, logout } = useLogout();

  return (
    <div className="flex justify-between gap-x-2">
      {isAuth ? (
          <>
            <Button>
              <UserRound />
              {user?.first_name}
            </Button>

            <Button
                disabled={isPending}
                variant='destructive'
                onClick={logout}
            >
              {isPending ? <Spinner /> : <LogOut />}
              {isPending ? 'Выходим...' : 'Выйти'}
            </Button>
          </>
          ) : (
          <Button asChild className="flex items-center gap-2">
            <Link to="/auth/login">
              <LogIn className="w-4 h-4" />
              Войти
            </Link>
          </Button>
      )}
    </div>
  );
};
