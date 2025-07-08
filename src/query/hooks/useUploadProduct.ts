import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // Array of image URLs
}

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Omit<ProductFormData, 'images'> & { images: string[] }) => {
      const { data } = await axiosClient.post("/artworks", productData);
      return data;
    },
    onSuccess: () => {  
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
};
