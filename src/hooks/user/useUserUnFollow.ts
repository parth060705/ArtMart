import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserUnFollow = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.delete(`/auth/${userId}/unfollow`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollow"] });
    },
  });
};
