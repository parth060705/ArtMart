import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { User } from "@/lib/types";

interface UserProfileResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  profileImage: string;
  followersList: User[];
  followingList: User[];
}

type UseUserProfileOptions = Omit<
  UseQueryOptions<UserProfileResponse, Error, UserProfileResponse, ["User"]>,
  "queryKey" | "queryFn"
>;

export const useUserProfile = (options: UseUserProfileOptions = {}) => {
  return useQuery<UserProfileResponse, Error, UserProfileResponse, ["User"]>({
    queryKey: ["User"],
    queryFn: async () => {
      const { data } = await axiosClient.get<UserProfileResponse>("/api/admin/users");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    ...options,
  });
};
