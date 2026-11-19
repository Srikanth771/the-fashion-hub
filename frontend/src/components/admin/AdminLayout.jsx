
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-[283px]">

        {/* Separate Navbar */}
        <AdminNavbar setSidebarOpen={setSidebarOpen} />

        {/* Admin Pages */}
        <main className="min-h-[calc(100vh-72px)] p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
