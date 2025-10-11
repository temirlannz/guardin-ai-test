import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authControllerLogout } from "@/shared/api/auth/logout";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: () => authControllerLogout(),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["user", "profile"] });

      if (data?.success) {
        toast.success(data.message);
      }

      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Server error");
    },
  });

  const logout = () => mutate();

  return { logout, isPending };
};
