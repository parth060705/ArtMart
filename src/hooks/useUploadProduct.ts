import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  files: File[];
}

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Omit<ProductFormData, 'files'> & { files: File[] }) => {
      const formData = new FormData();
      
      // Append all product data fields to formData
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'files') {
          // Handle files array separately - use 'file' as field name to match backend
          productData.files.forEach((file) => {
            formData.append('files', file);
          });
        } else {
          // Convert other values to string and append
          formData.append(key, String(value));
        }
      });

      const { data } = await axiosClient.post("/auth/artworks", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {  
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
};
