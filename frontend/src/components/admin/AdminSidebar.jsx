
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  Shirt,
  Package,
  Users,
  Ticket,
  Star,
  BarChart3,
  Settings,
  Bell,
  X,
  Store,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Orders", path: "/admin/orders", icon: ShoppingBag, badge: 8 },
  { title: "POS Billing", path: "/admin/pos-billing", icon: Receipt },
  { title: "Products", path: "/admin/products", icon: Shirt },
  { title: "Inventory", path: "/admin/inventory", icon: Package },
  { title: "Customers", path: "/admin/customers", icon: Users },
  { title: "Coupons", path: "/admin/coupons", icon: Ticket },
  { title: "Reviews", path: "/admin/reviews", icon: Star },
  { title: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { title: "Notifications", path: "/admin/notifications", icon: Bell, badge: 3 },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const closeSidebar = () => setOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("fashionHubAdminDemo");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[283px] flex-col overflow-hidden bg-[#141e32] text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h1 className="text-xl font-extrabold">Fashion Hub</h1>
            <p className="mt-1 text-xs text-[#d49a4b]">
              Men's Wear · Admin
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-gray-300 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex min-h-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin/dashboard"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex min-h-10 shrink-0 items-center gap-3 rounded-lg px-4 text-[13px] transition ${
                    isActive
                      ? "bg-[#b9823c] font-bold text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="flex-1">{item.title}</span>

                {item.badge && (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-white/10 px-5 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-[#b9823c]/20 p-2 text-[#d49a4b]">
              <Store size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold">Fashion Hub Admin</p>
              <p className="text-[10px] text-gray-400">
                Manage your store
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
