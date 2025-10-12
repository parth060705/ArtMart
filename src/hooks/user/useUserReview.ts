import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { Review } from "@/lib/types";

export const useUserReview = () => {
    return useQuery({
        queryKey: ["user-reviews"],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/auth/me/artistreview`);
            return data as Review[];
        },
    });
};
