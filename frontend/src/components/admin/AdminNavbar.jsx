
import React from "react";
import { Menu, Bell, Search } from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-7">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-[#141e32]">
            Admin Dashboard
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            The Fashion Hub Management
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={21} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#141e32] font-bold text-[#d49a4b]">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#141e32]">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;
