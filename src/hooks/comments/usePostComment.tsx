import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const usePostComment = (artwork_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content }: { content: string}) => {
      const { data: searchData } = await axiosClient.post(`/auth/comments/${artwork_id}`, { content, artwork_id });
      return searchData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", artwork_id] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", artwork_id] });
    },
  });
};
