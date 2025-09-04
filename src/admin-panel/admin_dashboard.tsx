import React, { useMemo, useState } from "react";
import { Brush, Users, ShoppingCart, Menu, ChevronLeft } from "lucide-react";
import ArtworkManage from "./artwork_manage"
import UseManage from "./user_manage";
import OrdersManage from "./orders_manage";

type PageKey = "artwork_manage" | "use_manage" | "orders_manage";

const navItems: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "artwork_manage", label: "Artwork Manage", icon: <Brush className="h-4 w-4" /> },
  { key: "use_manage", label: "User Manage", icon: <Users className="h-4 w-4" /> },
  { key: "orders_manage", label: "Orders Manage", icon: <ShoppingCart className="h-4 w-4" /> },
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
      default:
        return null;
    }
  }, [current]);

  return (
    <div className="h-screen w-full grid" style={{ gridTemplateColumns: collapsed ? "64px 1fr" : "256px 1fr" }}>
      {/* Sidebar */}
      <div className={`h-full border-r ${collapsed ? "w-16" : "w-64"} transition-[width] duration-300`}>
        <div className="h-14 flex items-center justify-between px-3">
          <span className="font-bold">{!collapsed && "Admin"}</span>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded ${current === item.key ? "bg-gray-200" : ""}`}
              onClick={() => setCurrent(item.key)}
            >
              {item.icon}
              {!collapsed && item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="h-full p-4 overflow-auto">{Content}</div>
    </div>
  );
}
