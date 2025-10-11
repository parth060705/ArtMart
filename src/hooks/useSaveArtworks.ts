import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useSaveArtwork = (artworkId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data: searchData } = await axiosClient.post(`/auth/Saved`, { artworkId });
            return searchData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["save", artworkId] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["save", artworkId] });
        },
    });
};
