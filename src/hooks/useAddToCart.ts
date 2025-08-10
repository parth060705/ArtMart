import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (artworkId: string) => {
      const { data } = await axiosClient.post("/auth/cart", { artworkId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    addToCart: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
