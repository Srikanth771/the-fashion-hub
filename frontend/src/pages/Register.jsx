import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Tag,
  Truck,
  Headphones,
  ShoppingBag,
  Gift,
  CheckCircle2,
  UserPlus
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import logo from "../assets/logof.png";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[\s-]/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions";
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

      console.log("Registration Data:", formData);

      // Successfully registered, navigate to login or home
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      setErrors({
        general: "Failed to create account. Please try again.",
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

        {/* Registration Card */}
        <div className="bg-white rounded-md overflow-hidden border border-gray-300 shadow-xl">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =================================================
                LEFT PANEL
            ================================================= */}

            <div className="bg-[#0B2341] text-white px-6 sm:px-8 lg:px-9 py-6 sm:py-7 flex flex-col justify-between">

              <div>
                <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1.5">
                  THE FASHION HUB
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Create Account!
                </h1>

                <p className="text-gray-300 text-xs sm:text-sm leading-5 mt-2 max-w-sm">
                  Join our fashion community today and get access to exclusive styles, member discounts, and personalized trends.
                </p>

                {/* Fashion Icon */}
                <div className="flex justify-center py-5">
                  <div className="relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#102D50] border border-[#D4AF37]/30 flex items-center justify-center">
                        <UserPlus
                          size={42}
                          strokeWidth={1.3}
                          className="text-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Top Icon */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                      <Gift
                        size={13}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    {/* Left Icon */}
                    <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                      <ShoppingBag
                        size={13}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    {/* Right Icon */}
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-7 h-7 rounded-full bg-[#102D50] border border-[#D4AF37]/50 flex items-center justify-center">
                      <ShieldCheck
                        size={13}
                        className="text-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Member Perks */}
                <div>
                  <h3 className="text-[#D4AF37] font-semibold text-xs mb-3">
                    Exclusive Member Benefits
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-[#D4AF37]"
                      />
                      <span className="text-xs text-gray-200">
                        10% off on your first order
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-[#D4AF37]"
                      />
                      <span className="text-xs text-gray-200">
                        Early access to seasonal sales
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-[#D4AF37]"
                      />
                      <span className="text-xs text-gray-200">
                        Fast checkout & order tracking
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-[#D4AF37]"
                      />
                      <span className="text-xs text-gray-200">
                        Earn reward points on purchases
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1F3758] text-[11px] text-gray-400">
                Need assistance? Contact support@fashionhub.com
              </div>

            </div>

            {/* =================================================
                RIGHT PANEL
            ================================================= */}

            <div className="bg-white px-6 sm:px-8 lg:px-9 py-6 sm:py-7">

              <div className="max-w-sm mx-auto">

                {/* Heading */}
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Register Account
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Fill in your information to get started
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
                  className="space-y-3.5"
                >

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-gray-800 mb-1"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full h-9 pl-9 pr-3 rounded-md border text-xs outline-none transition-all ${
                          errors.fullName
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />
                    </div>

                    {errors.fullName && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-800 mb-1"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full h-9 pl-9 pr-3 rounded-md border text-xs outline-none transition-all ${
                          errors.email
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-xs font-medium text-gray-800 mb-1"
                    >
                      Mobile Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`w-full h-9 pl-9 pr-3 rounded-md border text-xs outline-none transition-all ${
                          errors.mobile
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />
                    </div>

                    {errors.mobile && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-800 mb-1"
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
                        placeholder="At least 6 characters"
                        className={`w-full h-9 pl-9 pr-10 rounded-md border text-xs outline-none transition-all ${
                          errors.password
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-medium text-gray-800 mb-1"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        className={`w-full h-9 pl-9 pr-10 rounded-md border text-xs outline-none transition-all ${
                          errors.confirmPassword
                            ? "border-red-400"
                            : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => {
                          setAgreeTerms(e.target.checked);
                          if (errors.terms) {
                            setErrors((prev) => ({ ...prev, terms: "" }));
                          }
                        }}
                        className="w-3.5 h-3.5 mt-0.5 accent-[#D4AF37]"
                      />

                      <span className="text-[11px] text-gray-600 leading-tight">
                        I agree to the{" "}
                        <a href="#terms" className="text-[#C79B1B] underline hover:text-[#A77E0C]">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#privacy" className="text-[#C79B1B] underline hover:text-[#A77E0C]">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    {errors.terms && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-md bg-[#D4AF37] hover:bg-[#C79F24] text-black font-semibold text-xs transition-all disabled:opacity-60 shadow-sm mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Register Now"
                    )}
                  </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-3.5">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    or sign up with
                  </span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Google */}
                <button
                  type="button"
                  className="w-full h-9 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-medium text-gray-800 transition"
                >
                  <FcGoogle size={17} />
                  Sign up with Google
                </button>

                {/* Login Link */}
                <p className="text-center text-xs text-gray-500 mt-3.5">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#C79B1B] font-semibold hover:underline"
                  >
                    Login Now
                  </Link>
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            FEATURES BAR
        ===================================================== */}
        <div className="mt-3 border border-[#294361] rounded-md bg-[#0B2341] px-4 sm:px-6 py-3.5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">
                <ShieldCheck size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  100% Secure
                </h4>
                <p className="text-gray-400 text-[9px]">
                  Encrypted data & payments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">
                <Tag size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  Authentic Brands
                </h4>
                <p className="text-gray-400 text-[9px]">
                  Guaranteed genuine items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">
                <Truck size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  Fast Express Shipping
                </h4>
                <p className="text-gray-400 text-[9px]">
                  Doorstep delivery nationwide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-md border border-[#3A506D] bg-[#102D50] flex items-center justify-center">
                <Headphones size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                  24/7 VIP Support
                </h4>
                <p className="text-gray-400 text-[9px]">
                  Dedicated customer service
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Register;
