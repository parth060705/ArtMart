import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { UserProfile } from "@/lib/types";

export const useUserIsFollowingCheck = (userId: string) => {
    return useQuery({
        queryKey: ["useUserIsFollowingCheck", userId],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/auth/${userId}/follow`);
            return data as { is_following: boolean }    
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
    });
};
