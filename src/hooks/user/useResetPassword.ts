import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosClient } from "@/lib/axios"
import { ResetPasswordRequest, ResetPasswordResponse } from "@/lib/types"

export const useResetPassword = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ResetPasswordRequest) => {
            const { data: response } = await axiosClient.post(`/resetpassword`, data)
            return response as ResetPasswordResponse
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] })
        },
    })
}
