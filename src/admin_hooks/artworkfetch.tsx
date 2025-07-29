import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { Artwork } from "@/lib/types";

// FETCH ARTWORK
export const useAdminArtworks = () =>
  useQuery<Artwork[], Error>({
    queryKey: ["admin", "artworks"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/admin/artworks");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

// DELETE ARTWORK
export const useDeleteArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/admin/artworks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "artworks"] });
    },
  });
};

// ✅ UPDATE ARTWORKS with FormData for file upload
export const useUpdateArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: FormData;
    }) =>
      axiosClient.patch(`/admin/update/artworks/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "artworks"] });
    },
    onError: (err) => {
      console.error("Update artwork failed:", err);
    },
  });
};
