import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authControllerRegister, type RegisterDto } from "@/shared/api/auth/register";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (data: RegisterDto) => authControllerRegister(data),

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message || "Вы успешно зарегистрировались!");

        navigate("/auth/login");
      } else {
        toast.error("Не удалось зарегистрироваться. Попробуйте позже.");
      }
    },

    onError(error) {
      toast.error(error?.response?.data?.message || "Ошибка на сервере");
    },
  });

  const register = (data: RegisterDto) => {
    mutate(data);
  };

  return {
    register,
    isPending,
  };
};
