import React from "react";
import { useAdminOrders, useDeleteOrders } from "@/admin_hooks/ordersfetch";
import { format } from "date-fns";

const OrderManage = () => {
  const { data: orders, isLoading, isError, refetch } = useAdminOrders();
  const deleteOrder = useDeleteOrders();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder.mutate(id, {
        onSuccess: () => refetch(),
        onError: (err) => {
          console.error("Failed to delete order:", err);
          alert("Failed to delete order.");
        },
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-gray-500 animate-pulse">Loading orders...</div>
        ) : isError ? (
          <div className="p-6 text-red-500">Failed to load orders.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {[
                  "Order ID",
                  "Artwork ID",
                  "Buyer Username",
                  "Buyer Name",
                  "Location",
                  "Amount",
                  "Status",
                  "Date",
                  "Actions",
                ].map((head) => (
                  <th key={head} className="px-4 py-3 text-left whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.artworkId ?? "—"}</td>
                    <td className="px-4 py-3">{order.buyer?.username ?? "—"}</td>
                    <td className="px-4 py-3">{order.buyer?.name ?? "—"}</td>
                    <td className="px-4 py-3">{order.buyer?.location ?? "—"}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">
                      {order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order.createdAt
                        ? format(new Date(order.createdAt), "PPPp")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(order.id.toString())}
                        disabled={deleteOrder.isPending}
                        className={`px-3 py-1 rounded text-xs text-white ${
                          deleteOrder.isPending
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManage;
