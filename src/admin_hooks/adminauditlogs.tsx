import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { AdminauditLogs } from "@/lib/types";

// FETCH ADMIN AUDIT LOGS
export const useAdminAuditLogs = () =>
  useQuery<AdminauditLogs[], Error>({
    queryKey: ["admin", "logs"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/admin/auditlogs");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 600000,
  });