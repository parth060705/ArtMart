import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useDeleteArtworkImage = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosClient.delete(`/auth/artworks/${id}/images`, {
                data: formData, 
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artworks"] });
            queryClient.invalidateQueries({ queryKey: ["productDetails", id] });
        },
    });
};