import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useProductSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      const { data: searchData } = await axiosClient.post("/artworks/search", {query: values});
      return searchData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};
