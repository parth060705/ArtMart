import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosClient } from "@/lib/axios"
import { ChangePasswordRequest } from "@/lib/types"

export const useChangePassword = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ChangePasswordRequest) => {
            const { data: response } = await axiosClient.post(`/auth/change-password`, data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] })
        },
    })
}
