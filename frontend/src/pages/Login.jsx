import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Tag,
  Truck,
  Headphones,
  ShoppingBag,
  Heart,
  Star,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import logo from "../assets/logof.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email or mobile number is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login Data:", formData);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      setErrors({
        general: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081C35] px-3 sm:px-5 py-4 sm:py-5">

      {/* Main Wrapper */}
      <div className="max-w-[1000px] mx-auto">

        {/* Logo */}
        <div className="flex justify-center mb-3">

          <Link to="/">
            <img
              src={logo}
              alt="The Fashion Hub"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </Link>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-md overflow-hidden border border-gray-300 shadow-xl">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =================================================
                LEFT PANEL
            ================================================= */}

            <div className="bg-[#0B2341] text-white px-6 sm:px-8 lg:px-9 py-6 sm:py-7">

              <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1.5">
                THE FASHION HUB
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome Back!
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm leading-5 mt-2 max-w-sm">
                Sign in to your account and continue shopping
                premium men's fashion and latest trends.
              </p>

              {/* Fashion Icon */}
              <div className="flex justify-center py-5">

                <div className="relative">

                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#102D50] border border-[#D4AF37]/30 flex items-center justify-center">

                      <ShoppingBag
                        size={42}
                        strokeWidth={1.3}
                        className="text-[#D4AF37]"
                      />

                    </div>

                  </div>

                  {/* Top Icon */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                    <User
                      size={13}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  {/* Left Icon */}
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                    <Heart
                      size={13}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  {/* Right Icon */}
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                    <Star
                      size={13}
                      className="text-[#D4AF37]"
                    />
                  </div>

                </div>

              </div>

              {/* Why Login */}
              <div>

                <h3 className="text-[#D4AF37] font-semibold text-xs mb-3">
                  Why Login?
                </h3>

                <div className="space-y-2">

                  <div className="flex items-center gap-2.5">
                    <ShoppingBag
                      size={14}
                      className="text-[#D4AF37]"
                    />
                    <span className="text-xs text-gray-200">
                      Access your order history
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Truck
                      size={14}
                      className="text-[#D4AF37]"
                    />
                    <span className="text-xs text-gray-200">
                      Track your orders easily
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Heart
                      size={14}
                      className="text-[#D4AF37]"
                    />
                    <span className="text-xs text-gray-200">
                      Save your favorite products
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Tag
                      size={14}
                      className="text-[#D4AF37]"
                    />
                    <span className="text-xs text-gray-200">
                      Get exclusive deals & offers
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT PANEL
            ================================================= */}

            <div className="bg-white px-6 sm:px-8 lg:px-9 py-6 sm:py-7">

              <div className="max-w-sm mx-auto">

                {/* Heading */}

                <div className="mb-5">

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Login to Your Account
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
                    Enter your details to access your account
                  </p>

                </div>

                {/* General Error */}

                {errors.general && (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {errors.general}
                  </div>
                )}

                {/* Form */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-800 mb-1.5"
                    >
                      Email / Mobile Number
                    </label>

                    <div className="relative">

                      <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email or mobile number"
                        className={`w-full h-10 pl-9 pr-3 rounded-md border text-xs outline-none transition-all ${
                          errors.email
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />

                    </div>

                    {errors.email && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}

                  </div>

                  {/* Password */}

                  <div>

                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-800 mb-1.5"
                    >
                      Password
                    </label>

                    <div className="relative">

                      <Lock
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full h-10 pl-9 pr-10 rounded-md border text-xs outline-none transition-all ${
                          errors.password
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>

                    </div>

                    {errors.password && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}

                  </div>

                  {/* Remember + Forgot */}

                  <div className="flex items-center justify-between">

                    <label className="flex items-center gap-1.5 cursor-pointer">

                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) =>
                          setRememberMe(e.target.checked)
                        }
                        className="w-3.5 h-3.5 accent-[#D4AF37]"
                      />

                      <span className="text-[11px] text-gray-600">
                        Remember me
                      </span>

                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-[11px] text-[#C79B1B] hover:text-[#A77E0C] font-medium"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  {/* Login Button */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-md bg-[#D4AF37] hover:bg-[#C79F24] text-black font-semibold text-xs transition-all disabled:opacity-60"
                  >

                    {loading ? (
                      <span className="flex items-center justify-center gap-2">

                        <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>

                        Logging in...

                      </span>
                    ) : (
                      "Login"
                    )}

                  </button>

                </form>

                {/* Divider */}

                <div className="flex items-center gap-3 my-4">

                  <div className="h-px bg-gray-200 flex-1"></div>

                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    or continue with
                  </span>

                  <div className="h-px bg-gray-200 flex-1"></div>

                </div>

                {/* Google */}

                <button
                  type="button"
                  className="w-full h-10 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-medium text-gray-800 transition"
                >

                  <FcGoogle size={17} />

                  Continue with Google

                </button>

                {/* Register */}

                <p className="text-center text-xs text-gray-500 mt-4">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="text-[#C79B1B] font-semibold hover:underline"
                  >
                    Register Now
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <div className="mt-3 border border-[#294361] rounded-md bg-[#0B2341] px-4 sm:px-6 py-3.5">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">

            <div className="flex items-center gap-2.5">

              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">

                <ShieldCheck
                  size={16}
                  className="text-[#D4AF37]"
                />

              </div>

              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  Secure Payments
                </h4>

                <p className="text-gray-400 text-[9px]">
                  100% safe & secure
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2.5">

              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">

                <Tag
                  size={16}
                  className="text-[#D4AF37]"
                />

              </div>

              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  Best Fashion Prices
                </h4>

                <p className="text-gray-400 text-[9px]">
                  Great deals every day
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2.5">

              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">

                <Truck
                  size={16}
                  className="text-[#D4AF37]"
                />

              </div>

              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  Fast Delivery
                </h4>

                <p className="text-gray-400 text-[9px]">
                  Quick doorstep delivery
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2.5">

              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">

                <Headphones
                  size={16}
                  className="text-[#D4AF37]"
                />

              </div>

              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  24/7 Support
                </h4>

                <p className="text-gray-400 text-[9px]">
                  We're here to help
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;