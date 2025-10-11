import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserFollow = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(`/auth/${userId}/follow`);
      return data;
    },
    onSuccess: () => {
      // Invalidate both the follow status and the isFollowing check
      queryClient.invalidateQueries({ queryKey: ["userFollow"] });
      queryClient.invalidateQueries({ queryKey: ["useUserIsFollowingCheck", userId] });
    },
  });
};
