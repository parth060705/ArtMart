import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const usePostArtistReview = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ rating, comment, artistId }: { rating: number; comment: string; artistId: string }) => {
            const { data: review } = await axiosClient.post(`/auth/artistreview`, { rating, comment, artistId });
            return review;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};
