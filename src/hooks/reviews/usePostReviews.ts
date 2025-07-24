import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const usePostReviews = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ rating, comment, artworkId, artistId }: { rating: number; comment: string; artworkId: string; artistId: string }) => {
            const { data: searchData } = await axiosClient.post(`/auth/reviews`, { rating, comment, artworkId, artistId });
            return searchData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};
