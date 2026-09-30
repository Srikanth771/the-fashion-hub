import React from "react";
import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Category from "../../pages/Categories";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Bar */}
      <Topbar />

      {/* Navigation */}
      <Navbar />
      <Category />
      

      {/* Main Content */}
      <main className="flex-1 pt-[150px]">
        <Outlet />
      </main>

    
      <Footer />

    </div>
  );
};

export default MainLayout;