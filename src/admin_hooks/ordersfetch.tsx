import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { Orders } from "@/lib/types";


// FETCH ORDERS
export const useAdminOrders = () =>
  useQuery<Orders[], Error>({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/admin/orders");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

// DELETE ORDERS 
export const useDeleteOrders = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/admin/orders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
};
