import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosClient.post("/refresh");
      return response.data;
    },
  });
};
