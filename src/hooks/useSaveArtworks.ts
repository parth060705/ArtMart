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
            // Invalidate both the specific save and the saved artworks list
            queryClient.invalidateQueries({ queryKey: ["save", artworkId] });
            queryClient.invalidateQueries({ queryKey: ["get-saved-artworks"] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["save", artworkId] });
        },
    });
};
