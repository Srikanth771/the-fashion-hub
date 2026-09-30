import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  Grid,
  List,
  ChevronDown,
  Sparkles,
  X,
  SlidersHorizontal
} from "lucide-react";
import { allProducts } from "../../data/products";

const CATEGORIES_LIST = [
  "All Categories",
  "Shirts",
  "T-Shirts",
  "Jeans & Trousers",
  "Hoodies & Sweatshirts",
  "Jackets & Outerwear",
  "Ethnic Wear",
  "Footwear",
  "Accessories"
];

const ProductCatalog = ({
  pageTitle = "Trending Products",
  breadcrumbTitle = "Trending Products",
  badgeText = "Trending",
  filterPredicate = () => true
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedMinOrder, setSelectedMinOrder] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [wishlist, setWishlist] = useState({});
  const [toast, setToast] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const updated = !prev[id];
      showToast(updated ? "Saved to your Wishlist!" : "Removed from Wishlist");
      return { ...prev, [id]: updated };
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(filterPredicate);

    // Sub-category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange === "under500") {
      result = result.filter((p) => (p.priceNumber || 0) < 500);
    } else if (selectedPriceRange === "500-1000") {
      result = result.filter((p) => (p.priceNumber || 0) >= 500 && (p.priceNumber || 0) <= 1000);
    } else if (selectedPriceRange === "1000-5000") {
      result = result.filter((p) => (p.priceNumber || 0) >= 1000 && (p.priceNumber || 0) <= 5000);
    } else if (selectedPriceRange === "5000plus") {
      result = result.filter((p) => (p.priceNumber || 0) > 5000);
    }

    // Rating filter
    if (selectedRating === "4plus") {
      result = result.filter((p) => (p.rating || 0) >= 4.0);
    } else if (selectedRating === "4.5plus") {
      result = result.filter((p) => (p.rating || 0) >= 4.5);
    }

    // Sort
    if (sortBy === "priceLow") {
      result.sort((a, b) => (a.priceNumber || 0) - (b.priceNumber || 0));
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => (b.priceNumber || 0) - (a.priceNumber || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [filterPredicate, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedPriceRange("all");
    setSelectedRating("all");
    setSelectedMinOrder("all");
    setSortBy("relevant");
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 pt-4">

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2341] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#D4AF37] flex items-center gap-3 animate-bounce">
          <Sparkles className="text-[#D4AF37]" size={18} />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Container */}
      <div className="max-w-[1450px] mx-auto px-3 sm:px-5">

        {/* 1. DARK HERO BANNER HEADER */}
        <div className="bg-[#061A2D] text-white rounded-xl p-5 sm:p-7 md:p-8 mb-5 shadow-lg border border-[#1e344d] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1.5">
              <Link to="/" className="hover:text-[#D4AF37] transition">Home</Link>
              <span>›</span>
              <span className="text-[#D4AF37] font-semibold">{breadcrumbTitle}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="bg-[#102d4a] border border-[#23476d] text-[#D4AF37] text-xs font-bold px-4 py-2 rounded-full shadow-inner flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {filteredProducts.length} Products Available
            </span>
          </div>
        </div>

        {/* 2. CATEGORY PILL FILTER BAR */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2.5 mb-6 overflow-x-auto scrollbar-none flex items-center gap-2">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#061A2D] text-[#D4AF37] shadow-md scale-105 font-bold"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MOBILE FILTER TOGGLE BUTTON */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-sm"
          >
            <SlidersHorizontal size={16} className="text-[#D4AF37]" />
            FILTER & SORT ({filteredProducts.length} Items)
          </button>
        </div>

        {/* 3. MAIN LAYOUT: SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT SIDEBAR FILTERS (3 Cols) */}
          <aside
            className={`fixed inset-0 z-50 bg-white p-5 lg:static lg:z-auto lg:p-0 lg:bg-transparent lg:col-span-3 transition-all ${
              mobileFilterOpen ? "block overflow-y-auto" : "hidden lg:block"
            }`}
          >
            {/* Mobile Header inside drawer */}
            <div className="flex justify-between items-center lg:hidden pb-4 border-b border-gray-200 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Filter size={18} className="text-[#D4AF37]" /> Filter Products
              </h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-6">

              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <Filter size={16} className="text-[#D4AF37]" /> Filters
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#C79B1B] hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* MIN ORDER / AVAILABILITY */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                  Min. Order Qty / Stock
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "under50", label: "Under 50 units" },
                    { id: "50-200", label: "50–200 units" },
                    { id: "200plus", label: "200+ units" }
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="minOrder"
                        checked={selectedMinOrder === opt.id}
                        onChange={() => setSelectedMinOrder(opt.id)}
                        className="accent-[#D4AF37] w-3.5 h-3.5"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* PRICE RANGE */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                  Price Range
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under500", label: "Under ₹500" },
                    { id: "500-1000", label: "₹500 - ₹1,000" },
                    { id: "1000-5000", label: "₹1,000 - ₹5,000" },
                    { id: "5000plus", label: "₹5,000 & Above" }
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === opt.id}
                        onChange={() => setSelectedPriceRange(opt.id)}
                        className="accent-[#D4AF37] w-3.5 h-3.5"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* RATING */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                  Rating
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  {[
                    { id: "all", label: "All Ratings" },
                    { id: "4.5plus", label: "4.5★ & above" },
                    { id: "4plus", label: "4.0★ & above" }
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === opt.id}
                        onChange={() => setSelectedRating(opt.id)}
                        className="accent-[#D4AF37] w-3.5 h-3.5"
                      />
                      <span className="flex items-center gap-1">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply button for mobile */}
              <div className="lg:hidden pt-4">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2.5 bg-[#061A2D] text-white rounded-lg text-xs font-bold"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>

            </div>
          </aside>

          {/* RIGHT PRODUCTS LISTING (9 Cols) */}
          <main className="lg:col-span-9">

            {/* TOP BAR: Showing count, Sort & View toggle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3.5 mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-600 font-medium">
                Showing <strong className="text-gray-900">1–{filteredProducts.length}</strong> of <strong className="text-gray-900">{filteredProducts.length}</strong>
              </span>

              <div className="flex items-center gap-3 ml-auto">

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 font-medium text-gray-800 outline-none focus:border-[#D4AF37]"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                  </select>
                </div>

                {/* Grid / List Switcher */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden p-0.5 bg-gray-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition ${viewMode === "grid" ? "bg-white text-[#061A2D] shadow" : "text-gray-400 hover:text-gray-700"}`}
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition ${viewMode === "list" ? "bg-white text-[#061A2D] shadow" : "text-gray-400 hover:text-gray-700"}`}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>

              </div>
            </div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 font-semibold text-sm">No products found matching your active filter criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-lg hover:bg-[#c3a02f] transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (

              /* PRODUCT CARDS GRID OR LIST */
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex ${
                      viewMode === "grid" ? "flex-col" : "flex-row"
                    }`}
                  >
                    {/* IMAGE */}
                    <div
                      className={`relative overflow-hidden bg-gray-100 ${
                        viewMode === "grid" ? "aspect-[3/4] w-full" : "w-40 sm:w-56 aspect-[3/4] flex-shrink-0"
                      }`}
                    >
                      <Link to={`/product/${product.id}`} className="block h-full w-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* BADGE */}
                      <span className="absolute top-2 left-2 bg-[#061A2D] text-[#D4AF37] text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow tracking-wider uppercase">
                        {badgeText}
                      </span>

                      {/* WISHLIST BUTTON */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition ${
                          wishlist[product.id]
                            ? "bg-red-50 text-red-500"
                            : "bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white"
                        }`}
                      >
                        <Heart size={14} fill={wishlist[product.id] ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="p-3.5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                          {product.brand}
                        </span>

                        <Link to={`/product/${product.id}`} className="block">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#C79B1B] transition line-clamp-2 mt-0.5 leading-snug">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price & Unit */}
                        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                          <span className="font-extrabold text-sm sm:text-base text-gray-900">
                            {product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {product.oldPrice}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500">/ unit</span>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Min. {product.minOrder || 1} units
                        </p>
                      </div>

                      {/* ADD TO CART BUTTON */}
                      <button
                        onClick={() => showToast(`Added "${product.name}" to Cart!`)}
                        className="mt-3.5 w-full h-9 rounded-lg bg-[#061A2D] hover:bg-[#0c2842] text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow"
                      >
                        <ShoppingCart size={14} className="text-[#D4AF37]" />
                        Add to Cart
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default ProductCatalog;
