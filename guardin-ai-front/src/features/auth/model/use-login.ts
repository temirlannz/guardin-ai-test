import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authControllerLogin, type LoginDto } from "@/shared/api/auth/login";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (data: LoginDto) => authControllerLogin(data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user", "profile"] });

        toast.success("Вы успешно вошли в свой аккаунт");

        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Ошибка на сервере");
    },
  });

  const login = (data: LoginDto) => mutate(data);

  return {
    login,
    isPending,
  };
};
