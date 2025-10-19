import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { ChatListResponse } from "@/lib/types";

export const useChatList = () => {
    return useQuery({
        queryKey: ["chatList"],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/auth/chat/chatslist`);
            return data as ChatListResponse[];
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
    });
};
