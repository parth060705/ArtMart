import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserProfileUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (values: any) => axiosClient.patch('/auth/update/users/me', values),
        onSuccess: () => {
            toast.success('Profile updated successfully');
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
        },
        onError: () => {
            toast.error('Failed to update profile');
        },
    });
};