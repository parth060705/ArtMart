import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useGetChatHistory = (peerId: string) => {
  return useQuery({
    queryKey: ["chatHistory", peerId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/auth/chat/history/${peerId}`);
      return data;      
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
