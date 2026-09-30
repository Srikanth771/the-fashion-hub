import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import categories from "../data/categoryData";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed top-[104px] left-0 right-0 z-40 w-full bg-[#132238] border-t border-yellow-500"
    >
      <div className="flex items-center w-full">

        {/* ================= All Categories ================= */}

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-[260px] h-14 px-6 bg-[#132238] text-white font-semibold flex items-center justify-between hover:bg-[#1d3557] transition"
          >
            <div className="flex items-center gap-3">
              <Menu size={22} />
              <span>All Categories</span>
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ================= Mega Menu ================= */}

          {open && (
  <div
    className="
      absolute
      top-full
      left-0
      flex
      w-[700px]
      bg-white
      rounded-b-xl
      shadow-2xl
      border
      border-gray-200
      z-50
    "
  >
    {/* Left Side */}
    <div
      className="
        w-[260px]
        bg-gray-50
        border-r
        max-h-[500px]
        overflow-y-auto
        scrollbar-none
      "
    >
      {categories.map((cat) => {
        const Icon = cat.icon;

        return (
          <button
            key={cat.id}
            onMouseEnter={() => setActiveCategory(cat)}
            className={`w-full flex items-center justify-between px-5 py-4 transition-all
              ${
                activeCategory.id === cat.id
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-yellow-50 text-gray-700"
              }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} />
              {cat.name}
            </div>

            <ChevronRight size={18} />
          </button>
        );
      })}
    </div>

    {/* Right Side */}
    <div
      className="
        flex-1
        p-8
        bg-white
        max-h-[500px]
        overflow-y-auto
        no-scrollbar
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <activeCategory.icon
          size={24}
          className="text-yellow-500"
        />

        <h2 className="text-2xl font-bold">
          {activeCategory.name}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-16 gap-y-4">
        {activeCategory.items.map((item, index) => (
          <Link
            key={index}
            to={`/category/${encodeURIComponent(item)}`}
            onClick={() => setOpen(false)}
            className="text-left text-[15px] text-gray-700 hover:text-yellow-600 hover:translate-x-1 transition-all duration-300 cursor-pointer block"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Link
          to={`/category/${encodeURIComponent(activeCategory.name)}`}
          onClick={() => setOpen(false)}
          className="bg-yellow-500 hover:bg-yellow-400 px-5 py-2 rounded-lg font-semibold text-black transition block"
        >
          View All →
        </Link>
      </div>
    </div>
  </div>
)}

        </div>

        {/* ================= Navigation ================= */}

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 h-14 text-white font-medium text-sm">

          <Link to="/" className="hover:text-yellow-400 transition font-medium">
            Home
          </Link>

          <Link to="/trending" className="hover:text-yellow-400 transition font-medium">
            Trending
          </Link>

          <Link to="/flash-deals" className="hover:text-yellow-400 transition font-medium">
            Flash Deals
          </Link>

          <Link to="/new-arrivals" className="hover:text-yellow-400 transition font-medium">
            New Arrivals
          </Link>

          <Link to="/products" className="hover:text-yellow-400 transition font-medium">
            All Products
          </Link>

          <Link to="/about" className="hover:text-yellow-400 transition font-medium">
            About Us
          </Link>

          <Link to="/contact" className="hover:text-yellow-400 transition font-medium">
            Contact Us
          </Link>

        </nav>

      </div>
    </div>
  );
}