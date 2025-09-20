import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useAddToWishList = (artworkId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data: searchData } = await axiosClient.post(`/auth/wishlist`, { artworkId });
            return searchData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", artworkId] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", artworkId] });
        },
    });
};
