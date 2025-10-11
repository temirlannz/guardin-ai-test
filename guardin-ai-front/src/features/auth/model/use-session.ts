import { useQuery } from '@tanstack/react-query';
import {authControllerUserProfile} from "@/shared/api/auth/user-profile.ts";


export function useSession() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => authControllerUserProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // кэш 5 минут
    gcTime: 10 * 60 * 1000,
  });

  return {
    isAuth: Boolean(data),
    user: data,
    isPending,
    isError,
  };
}
