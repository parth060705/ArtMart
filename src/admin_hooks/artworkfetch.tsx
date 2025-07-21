// hooks/admin/useArtworks.ts
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

// UPDATE ARTWORKS
export const useUpdateArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, artwork }: { id: string; artwork: Partial<Artwork> }) =>
      axiosClient.patch(`/admin/update/artworks/${id}`, artwork),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "artworks"] });
    },
    onError: (err) => {
      console.error("Update artwork failed:", err);
    },
  });
};

