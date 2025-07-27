import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await axiosClient.post(`/auth/${userId}/follow`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollow"] });
    },
  });
};
