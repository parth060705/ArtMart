import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { TopArtsistResponse } from "@/lib/types";

export const useGetTopArtists = () => {
    return useQuery({
        queryKey: ["useGetTopArtists"],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/artists/top`);
            return data as TopArtsistResponse[]
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
    });
};
