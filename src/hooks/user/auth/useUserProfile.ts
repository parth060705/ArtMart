import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { User } from "@/lib/types";


export const useUserProfile = () => {
  return useQuery({
    queryKey: ["me-profile"] as const,
    queryFn: async () => {
      const { data } = await axiosClient.get("/auth/me");
      return data as User
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
