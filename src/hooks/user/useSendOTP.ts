import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosClient } from "@/lib/axios"

export const useSendOTP = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (email: string) => {
            const { data: response } = await axiosClient.post(`/forgotpassword?email=${email}`)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] })
        },
    })
}
