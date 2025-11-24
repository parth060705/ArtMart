import React, { useMemo, useState } from "react";
import { Brush, Users, ShoppingCart, Menu, ChevronLeft, Scroll } from "lucide-react";
import ArtworkManage from "./artwork_manage";
import UseManage from "./user_manage";
import OrdersManage from "./orders_manage";
import AdminAuditLogsPage from "./admin_audit_logs";

type PageKey =
  | "artwork_manage"
  | "use_manage"
  | "orders_manage"
  | "admin_audit_logs";

const navItems: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "artwork_manage", label: "Artwork Manage", icon: <Brush className="h-4 w-4" /> },
  { key: "use_manage", label: "User Manage", icon: <Users className="h-4 w-4" /> },
  { key: "orders_manage", label: "Orders Manage", icon: <ShoppingCart className="h-4 w-4" /> },
  { key: "admin_audit_logs", label: "Admin Audit Logs", icon: <Scroll className="h-4 w-4" /> },
];

export default function AdminDashboardSkeleton() {
  const [current, setCurrent] = useState<PageKey>("artwork_manage");
  const [collapsed, setCollapsed] = useState(false);

  const Content = useMemo(() => {
    switch (current) {
      case "artwork_manage":
        return <ArtworkManage />;
      case "use_manage":
        return <UseManage />;
      case "orders_manage":
        return <OrdersManage />;
      case "admin_audit_logs":
        return <AdminAuditLogsPage />;
      default:
        return null;
    }
  }, [current]);

  return (
    <div
      className="h-screen w-full grid bg-gray-50"
      style={{ gridTemplateColumns: collapsed ? "64px 1fr" : "240px 1fr" }}
    >
      {/* Sidebar */}
      <div
        className={`h-full border-r bg-white shadow-sm ${
          collapsed ? "w-16" : "w-60"
        } transition-[width] duration-300`}
      >
        <div className="h-14 flex items-center justify-between px-3">
          <span className="font-bold truncate">{!collapsed && "Admin"}</span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const active = current === item.key;
            return (
              <button
                key={item.key}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setCurrent(item.key)}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="h-full p-4 overflow-auto">{Content}</div>
    </div>
  );
}
