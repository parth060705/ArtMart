import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosClient } from "@/lib/axios"

export const useGoogleLoginRegister = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (token: string) => {
            const formData = new FormData();
            formData.append('id_token', token);

            const { data: response } = await axiosClient.post('/google', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["google login/register"] });
            // Consider adding success handling here, like redirecting the user
        },
        onError: (error: any) => {
            console.error('Google login error:', error);
            // You might want to handle errors here or let the component handle them
            throw error;
        }
    });
}
