import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserUnFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await axiosClient.delete(`/auth/${userId}/unfollow`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollow"] });
    },
  });
};
