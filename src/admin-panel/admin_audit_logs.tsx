import React from "react";
import { useAdminAuditLogs } from "@/admin_hooks/adminauditlogs";
import { AdminauditLogs } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const headers = [
    "Method",
    "Path",
    "Action",
    "Description",
    "IP Address",
    "Admin ID",
    "Timestamp",
];

export default function AdminAuditLogsPage() {
    const { data: logs = [], isLoading, isError, refetch, isFetching } = useAdminAuditLogs();

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Admin Audit Logs</h1>

                {/* Refresh Button */}
                <Button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="rounded-2xl px-4 py-2 flex items-center gap-2"
                >
                    {isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Refresh"
                    )}
                </Button>
            </div>

            <Card className="rounded-lg shadow bg-white overflow-x-auto">
                <CardContent className="p-4">
                    {isLoading && (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}

                    {isError && (
                        <div className="text-red-500 font-medium">
                            Failed to load logs.
                        </div>
                    )}

                    {!isLoading && (
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    {headers.map((head) => (
                                        <th
                                            key={head}
                                            className="px-4 py-3 whitespace-nowrap"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {logs.map((log: AdminauditLogs) => (
                                    <tr
                                        key={log.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">{log.method}</td>
                                        <td className="px-4 py-3">{log.path}</td>
                                        <td className="px-4 py-3">{log.action}</td>
                                        <td className="px-4 py-3">{log.description}</td>
                                        <td className="px-4 py-3">{log.ip_address}</td>
                                        <td className="px-4 py-3">{log.admin_id}</td>
                                        {/* <td className="px-4 py-3">{log.timestamp}</td> */}
                                        <td className="px-4 py-3">
                                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : "—"}
                                        </td>
                                    </tr>
                                ))}

                                {logs.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={headers.length}
                                            className="text-center text-gray-500 py-6"
                                        >
                                            No audit logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
