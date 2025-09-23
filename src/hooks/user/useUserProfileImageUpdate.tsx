import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ProfileImageUpdateData {
    image: File;
}

export const useUserProfileImageUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: ProfileImageUpdateData) => {
            const formData = new FormData();
            formData.append('file', values.image);

            const response = await axiosClient.patch('/auth/update/users/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Profile image updated successfully');
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Failed to update profile image';
            toast.error(errorMessage);
        },
    });
};