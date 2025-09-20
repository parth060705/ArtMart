import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  forSale: boolean;
  tags: string[];
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
          // Handle files array separately
          productData.files.forEach((file) => {
            formData.append('files', file);
          });
        } else if (key === 'tags' && Array.isArray(value)) {
          // Handle tags array
          value.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
          });
        } else if (value !== undefined && value !== null) {
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
