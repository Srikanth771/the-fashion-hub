
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Shirt,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Demo credentials only
    if (
      email.trim().toLowerCase() === "admin@fashionhub.com" &&
      password === "Admin@123"
    ) {
      sessionStorage.setItem("fashionHubAdminDemo", "true");

      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-[#141e32] p-12 text-white relative overflow-hidden">

          <div className="absolute -right-24 -top-24 w-80 h-80 border border-white/10 rounded-full" />

          <div className="absolute -bottom-32 -left-24 w-96 h-96 border border-white/10 rounded-full" />

          {/* BRAND */}
          <div className="relative z-10 flex items-center gap-3">

            <div className="w-12 h-12 bg-[#b9823c] rounded-xl flex items-center justify-center">
              <Shirt size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Fashion Hub
              </h1>

              <p className="text-xs tracking-widest text-[#d49a4b]">
                ADMIN PORTAL
              </p>
            </div>

          </div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-md">

            <span className="text-sm font-semibold tracking-[3px] text-[#d49a4b]">
              WELCOME BACK
            </span>

            <h2 className="mt-5 text-5xl font-bold leading-tight">
              Manage Your
              <span className="block text-[#d49a4b]">
                Fashion Store
              </span>
            </h2>

            <p className="mt-6 text-gray-300 leading-7">
              Access your administration panel to manage products,
              orders, customers, inventory and store performance.
            </p>

            <div className="mt-10 flex items-center gap-3">

              <ShieldCheck className="text-[#d49a4b]" size={24} />

              <span className="text-sm text-gray-300">
                Secure Administrator Access
              </span>

            </div>

          </div>

          <p className="relative z-10 text-xs text-gray-400">
            © {new Date().getFullYear()} The Fashion Hub. All rights reserved.
          </p>

        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* MOBILE BRAND */}
            <div className="flex items-center gap-3 mb-10 lg:hidden">

              <div className="w-11 h-11 rounded-xl bg-[#b9823c] flex items-center justify-center text-white">
                <Shirt size={23} />
              </div>

              <div>
                <h2 className="font-bold text-xl text-[#141e32]">
                  Fashion Hub
                </h2>

                <p className="text-xs text-[#b9823c]">
                  ADMIN PORTAL
                </p>
              </div>

            </div>

            {/* TITLE */}
            <div className="mb-9">

              <div className="w-14 h-14 rounded-xl bg-[#b9823c]/10 text-[#b9823c] flex items-center justify-center mb-5">
                <LockKeyhole size={27} />
              </div>

              <h2 className="text-3xl font-bold text-[#141e32]">
                Admin Login
              </h2>

              <p className="mt-2 text-gray-500 text-sm">
                Please sign in to access your admin dashboard.
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-[#26334a] mb-2">
                  Admin Email Address
                </label>

                <div className="flex items-center h-12 border border-gray-300 rounded-lg px-4 gap-3 focus-within:border-[#b9823c] focus-within:ring-2 focus-within:ring-[#b9823c]/10">

                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none text-sm bg-transparent"
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-[#26334a] mb-2">
                  Password
                </label>

                <div className="flex items-center h-12 border border-gray-300 rounded-lg px-4 gap-3 focus-within:border-[#b9823c] focus-within:ring-2 focus-within:ring-[#b9823c]/10">

                  <LockKeyhole size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none text-sm bg-transparent"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-[#141e32]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* ERROR */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#b9823c] hover:bg-[#a87331] text-white font-semibold rounded-lg transition"
              >
                Sign In to Admin Panel
                <ArrowRight size={18} />
              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 border-t border-gray-100 pt-6">

              <p className="text-center text-xs text-gray-400">
                This login is restricted to authorized administrators.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
