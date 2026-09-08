import React, { useEffect, useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiBell,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import CategoryMenu from "../../pages/Categories";

import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/logof.png";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navIcon =
    "relative flex flex-col items-center text-gray-200 hover:text-yellow-400 transition-all duration-300 cursor-pointer group";

  return (
    <>
      <header
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#0F172A] shadow-lg" : "bg-[#0F172A]"
        }`}
      >
        <div className="max-w-[1500px] mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Logo */}

            <motion.div
              //   whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={logo}
                alt="Fashion Hub"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </motion.div>

            {/* Search */}

            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <FiSearch
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, brands..."
                  className="w-full bg-white rounded-full h-11 pl-12 pr-28 border border-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 outline-none transition-all"
                />

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="absolute right-1.5 top-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full px-5 h-8 text-sm font-medium transition"
                >
                  Search
                </motion.button>
              </div>
            </div>

            {/* Desktop Icons */}

            <div className="hidden lg:flex items-center gap-5">
              <motion.div whileHover={{ y: -3 }} className={navIcon}>
                <FiHeart size={20} />

                <span className="text-xs mt-1">Wishlist</span>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className={navIcon}>
                <div className="relative">
                  <FiBell size={20} />

                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </div>

                <span className="text-xs mt-1">Alerts</span>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className={navIcon}>
                <FiUser size={20} />

                <span className="text-xs mt-1">Profile</span>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className={navIcon}>
                <div className="relative">
                  <FiShoppingCart size={20} />

                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                    }}
                    className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                  >
                    2
                  </motion.span>
                </div>

                <span className="text-xs mt-1">Cart</span>
              </motion.div>
            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-white"
            >
              {mobileMenu ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
          </div>

          {/* Mobile Search */}

          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-4 text-gray-500"
                size={18}
              />

              <input
                placeholder="Search..."
                className="w-full h-12 rounded-full pl-12 pr-5 outline-none"
              />
            </div>
          </div>
          {/* Mobile Menu */}

          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-[280px] bg-[#0F172A] shadow-2xl lg:hidden z-50"
              >
                {/* Header */}

                <div className="flex items-center justify-between px-6 h-20 border-b border-gray-700">
                  <img
                    src={logo}
                    alt="Fashion Hub"
                    className="h-12 object-contain"
                  />

                  <button
                    onClick={() => setMobileMenu(false)}
                    className="text-white hover:text-yellow-400 transition"
                  >
                    <FiX size={28} />
                  </button>
                </div>

                {/* Menu */}

                <div className="flex flex-col py-6">
                  <a
                    href="/wishlist"
                    className="flex items-center gap-4 px-6 py-4 text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    <FiHeart size={22} />
                    Wishlist
                  </a>

                  <a
                    href="/alerts"
                    className="flex items-center justify-between px-6 py-4 text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <FiBell size={22} />
                      Alerts
                    </div>

                    <span className="bg-red-500 text-white rounded-full text-xs px-2 py-1">
                      3
                    </span>
                  </a>

                  <a
                    href="/profile"
                    className="flex items-center gap-4 px-6 py-4 text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    <FiUser size={22} />
                    Profile
                  </a>

                  <a
                    href="/cart"
                    className="flex items-center justify-between px-6 py-4 text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <FiShoppingCart size={22} />
                      Cart
                    </div>

                    <span className="bg-yellow-500 text-black rounded-full text-xs px-2 py-1 font-semibold">
                      2
                    </span>
                  </a>
                </div>

                {/* Footer */}

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-6">
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105">
                    Login
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}