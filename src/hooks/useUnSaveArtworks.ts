import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUnSaveArtworks = (artwork_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.delete(`/auth/Saved/artwork/${artwork_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["save"] });
      queryClient.invalidateQueries({ queryKey: ["get-saved-artworks"] });
    },
  });
};
