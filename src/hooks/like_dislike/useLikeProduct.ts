import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axios';

export const useLikeProduct = (artworkId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await axiosClient.post(`/auth/likes/${artworkId}`);
            return data;
        },
        onSuccess: () => {
            // Invalidate relevant queries to refetch the updated data
            queryClient.invalidateQueries({ queryKey: ['productDetails', artworkId] });
            queryClient.invalidateQueries({ queryKey: ['like', artworkId] });
        },
        onError: (error) => {
            console.error('Error liking artwork:', error);
        },
    });
};
