import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { ProductFormData } from "@/lib/types";

export const useUpdateArtworkImages = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosClient.patch(`/auth/artworks/${id}/images`, formData, {
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
