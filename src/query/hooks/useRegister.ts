import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      const { data: registerData } = await axiosClient.post("/register", values);
      return registerData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });
};
