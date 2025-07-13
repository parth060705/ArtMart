import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const usePostComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, artwork_id }: { content: string; artwork_id: string }) => {
      const { data: searchData } = await axiosClient.post(`/comments/${id}`, { content, artwork_id });
      return searchData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });
};
