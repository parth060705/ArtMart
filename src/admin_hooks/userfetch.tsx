import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { User } from "@/lib/types";

// FETCH USERS 
type UseAdminUsersOptions = Omit<UseQueryOptions<User[], Error>, "queryKey" | "queryFn">;

export const useAdminUsers = (
  options: UseAdminUsersOptions = {}
): UseQueryResult<User[], Error> => {
  return useQuery<User[], Error>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data } = await axiosClient.get<User[]>("/admin/users");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    ...options,
  });
};

//  CREATE USER
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: Partial<User>) =>
      axiosClient.post("/admin/register", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

//  UPDATE USER 
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: Partial<User> }) =>
      axiosClient.patch(`/admin/update/users/${id}`, user),

    onSuccess: () => {
      console.log("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },

    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
};

// DELETE USER 
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/admin/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
