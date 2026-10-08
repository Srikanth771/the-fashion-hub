import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2,
  MapPin,
  Sparkles,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Minus,
  Plus
} from "lucide-react";
import { getProductById, allProducts } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [toastMessage, setToastMessage] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo(0, 0);
    const item = getProductById(id);
    setProduct(item);
    if (item) {
      setSelectedImage(item.image);
      if (item.sizes && item.sizes.length > 0) {
        setSelectedSize(item.sizes[0]);
      }
      if (item.colors && item.colors.length > 0) {
        setSelectedColor(item.colors[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The product you are looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#b8972e] transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size first!");
      return;
    }
    showToast(`Added ${quantity} x "${product.name}" (${selectedSize}) to Cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast("Please select a size first!");
      return;
    }
    showToast(`Proceeding to checkout with ${product.name}...`);
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setPincodeStatus({ valid: false, message: "Please enter a valid 6-digit PIN code" });
      return;
    }
    setPincodeStatus({
      valid: true,
      message: `Standard Delivery by ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}. Cash on Delivery Available.`
    });
  };

  const relatedProducts = allProducts.filter((p) => String(p.id) !== String(product.id)).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen pb-16 pt-4">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2341] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#D4AF37] flex items-center gap-3 animate-bounce">
          <Sparkles className="text-[#D4AF37]" size={20} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#D4AF37] transition">Home</Link>
          <ChevronRight size={12} />
          <span className="hover:text-[#D4AF37] cursor-pointer">{product.category || "Fashion"}</span>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Main Product Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">

            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-none py-1">
              {(product.gallery || [product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-100 ${
                    selectedImage === img
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20 scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group min-h-[380px] sm:min-h-[480px]">

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Discount Tag */}
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {product.discount}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist!");
                }}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                  isWishlisted
                    ? "bg-red-50 text-red-500 border border-red-200"
                    : "bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white"
                }`}
                title="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>

            </div>

          </div>

          {/* RIGHT: Product Details (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">

            <div>

              {/* Brand & Share */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                  {product.brand}
                </span>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast("Product link copied to clipboard!");
                  }}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-bold text-amber-700">
                  <span>{product.rating || "4.8"}</span>
                  <Star size={13} className="ml-1 fill-amber-500 text-amber-500" />
                </div>

                <span className="text-xs text-gray-500">|</span>

                <span className="text-xs text-gray-600 font-medium">
                  {product.reviews || 120} Customer Reviews
                </span>

                <span className="text-xs text-gray-500">|</span>

                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check size={14} /> In Stock
                </span>
              </div>

              {/* Price Block */}
              <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {product.price}
                </span>

                {product.oldPrice && (
                  <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                    {product.oldPrice}
                  </span>
                )}

                {product.discount && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Save {product.discount}
                  </span>
                )}

                <span className="text-[11px] text-gray-400 ml-auto hidden sm:inline">
                  (Inclusive of all taxes)
                </span>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-xs sm:text-sm mt-4 leading-relaxed">
                {product.description}
              </p>

              <hr className="my-5 border-gray-200" />

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Color: <span className="text-gray-500 font-normal">{selectedColor?.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedColor?.name === color.name
                            ? "ring-2 ring-offset-2 ring-[#0B2341] scale-110"
                            : "hover:scale-105 opacity-90"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {color.border && <span className="absolute inset-0 rounded-full border border-gray-300" />}
                        {selectedColor?.name === color.name && (
                          <Check size={14} className={color.hex === "#FFFFFF" ? "text-black" : "text-white"} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Select Size: <span className="text-[#D4AF37] font-bold">{selectedSize}</span>
                    </label>

                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-[#C79B1B] font-semibold hover:underline"
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`h-10 min-w-[44px] px-3.5 rounded-lg border text-xs font-bold transition-all ${
                          selectedSize === sz
                            ? "bg-[#0B2341] text-white border-[#0B2341] shadow-md scale-105"
                            : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:bg-gray-200 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:bg-gray-200 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Link
                 to={"/cart"}
                  onClick={handleAddToCart}
                  className="h-12 rounded-xl bg-[#0B2341] hover:bg-[#06172e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <ShoppingCart size={18} />
                  ADD TO CART
                </Link>

                <button
                  onClick={handleBuyNow}
                  className="h-12 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2c] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  BUY IT NOW
                </button>
              </div>

            </div>

            {/* Pincode & Delivery check */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <MapPin size={15} className="text-[#D4AF37]" />
                Check Delivery & COD Availability
              </label>

              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 h-9 px-3 text-xs border border-gray-300 rounded-md outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="h-9 px-4 bg-[#0B2341] hover:bg-[#102d50] text-white text-xs font-semibold rounded-md transition"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <p className={`text-xs mt-2 ${pincodeStatus.valid ? "text-emerald-700 font-medium" : "text-red-600"}`}>
                  {pincodeStatus.message}
                </p>
              )}
            </div>

            {/* Guarantees Bar */}
            <div className="mt-6 grid grid-cols-3 gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="flex flex-col items-center">
                <Truck size={18} className="text-[#D4AF37] mb-1" />
                <span className="text-[10px] font-semibold text-gray-800">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-200">
                <RotateCcw size={18} className="text-[#D4AF37] mb-1" />
                <span className="text-[10px] font-semibold text-gray-800">15 Days Return</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={18} className="text-[#D4AF37] mb-1" />
                <span className="text-[10px] font-semibold text-gray-800">100% Genuine</span>
              </div>
            </div>

          </div>

        </div>

        {/* Size Guide Modal (Optional drawer/inline) */}
        {showSizeGuide && (
          <div className="mt-6 bg-white border border-[#D4AF37]/40 rounded-xl p-5 shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-sm text-[#0B2341]">Size Measurement Guide (Inches)</h4>
              <button onClick={() => setShowSizeGuide(false)} className="text-xs text-gray-400 hover:text-gray-800">Close ✕</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-600 border border-gray-200">
                <thead className="bg-[#0B2341] text-white uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border">Size</th>
                    <th className="p-2 border">Chest</th>
                    <th className="p-2 border">Shoulder</th>
                    <th className="p-2 border">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2 border font-bold">S</td><td className="p-2 border">38"</td><td className="p-2 border">16.5"</td><td className="p-2 border">28"</td></tr>
                  <tr className="border-b bg-gray-50"><td className="p-2 border font-bold">M</td><td className="p-2 border">40"</td><td className="p-2 border">17.5"</td><td className="p-2 border">29"</td></tr>
                  <tr className="border-b"><td className="p-2 border font-bold">L</td><td className="p-2 border">42"</td><td className="p-2 border">18.5"</td><td className="p-2 border">30"</td></tr>
                  <tr className="border-b bg-gray-50"><td className="p-2 border font-bold">XL</td><td className="p-2 border">44"</td><td className="p-2 border">19.5"</td><td className="p-2 border">31"</td></tr>
                  <tr><td className="p-2 border font-bold">XXL</td><td className="p-2 border">46"</td><td className="p-2 border">20.5"</td><td className="p-2 border">32"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabbed Info Section */}
        <div className="mt-10 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Tab Header */}
          <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
            {[
              { id: "description", label: "Description & Features" },
              { id: "specifications", label: "Specifications" },
              { id: "reviews", label: `Reviews (${product.reviews || 120})` },
              { id: "shipping", label: "Shipping & Returns" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#D4AF37] text-[#0B2341] bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Product Overview</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl">
                    {product.description}
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Key Highlights</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                <h3 className="text-base font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`flex px-4 py-3 text-xs sm:text-sm ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="w-1/3 font-bold text-gray-700">{key}</span>
                      <span className="w-2/3 text-gray-600">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Rating Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex flex-col items-center justify-center text-center border-r-0 md:border-r border-gray-200 pr-0 md:pr-6">
                    <span className="text-4xl font-extrabold text-gray-900">{product.rating}</span>
                    <div className="flex text-amber-500 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Based on {product.reviews || 120} reviews</span>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    {[
                      { star: 5, pct: "82%" },
                      { star: 4, pct: "12%" },
                      { star: 3, pct: "4%" },
                      { star: 2, pct: "1%" },
                      { star: 1, pct: "1%" }
                    ].map((row) => (
                      <div key={row.star} className="flex items-center gap-3 text-xs">
                        <span className="w-12 font-medium text-gray-600 flex items-center">{row.star} Star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: row.pct }} />
                        </div>
                        <span className="w-10 text-right text-gray-500">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Rahul Verma",
                      date: "2 days ago",
                      rating: 5,
                      comment: "Extremely comfortable fabric and perfect fit! Looks luxurious and premium. Delivered fast too."
                    },
                    {
                      name: "Ananya Sharma",
                      date: "1 week ago",
                      rating: 5,
                      comment: "Bought this for my husband and he loved it! High-grade cotton and zero shrinkage after washing."
                    },
                    {
                      name: "Vikram Malhotra",
                      date: "2 weeks ago",
                      rating: 4,
                      comment: "Great quality product. The color matches the picture exactly. Highly recommended."
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-gray-900">{rev.name}</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500 my-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} className="fill-amber-500" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 max-w-3xl">
                <h3 className="font-bold text-gray-900 text-base">Delivery Information</h3>
                <p>
                  All orders are processed within 24 hours. We offer express door-to-door delivery across India with full tracking capabilities.
                </p>
                <h3 className="font-bold text-gray-900 text-base pt-2">Easy 15-Day Return Policy</h3>
                <p>
                  If you are not 100% satisfied with your purchase, you can return or exchange the item within 15 days of delivery. The item must be unworn, unwashed, and in original packaging with tags intact.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* You May Also Like (Related Products) */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">RECOMMENDED FOR YOU</p>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">You May Also Like</h2>
            </div>
            <Link to="/" className="text-xs font-bold text-[#0B2341] hover:text-[#D4AF37] flex items-center gap-1">
              Explore Catalog <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <Link
                key={relProduct.id}
                to={`/product/${relProduct.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {relProduct.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {relProduct.discount}
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                    {relProduct.brand}
                  </span>
                  <h3 className="text-xs font-semibold text-gray-900 group-hover:text-[#D4AF37] transition line-clamp-1 mt-1">
                    {relProduct.name}
                  </h3>
                  <div className="mt-auto pt-2 flex items-baseline gap-2">
                    <span className="font-bold text-sm text-gray-900">{relProduct.price}</span>
                    {relProduct.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">{relProduct.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
