import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // BACKEND API
      // ==========================================

      // Replace this URL with your actual backend URL
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process your request."
        );
      }

      setSuccess(
        data.message ||
          "If an account exists with this email, a password reset link has been sent."
      );

      setEmail("");
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-[1050px] grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* ==========================================
            LEFT SIDE - BRANDING
        ========================================== */}

        <div className="hidden lg:flex relative bg-[#192b43] p-12 flex-col justify-between overflow-hidden">

          {/* Decorative circles */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d6b94f]/10" />

          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#d6b94f]/10" />

          <div className="relative z-10">

            {/* Logo */}

            <Link to="/">
              <img
                src="/assets/logof.png"
                alt="The Fashion Hub"
                className="w-[220px] h-auto object-contain"
              />
            </Link>

          </div>

          <div className="relative z-10">

            <div className="w-14 h-14 rounded-2xl bg-[#d6b94f]/15 flex items-center justify-center mb-6">
              <ShieldCheck
                size={28}
                className="text-[#d6b94f]"
              />
            </div>

            <h2 className="text-4xl font-bold text-white leading-tight">
              Secure your
              <br />
              <span className="text-[#d6b94f]">
                account
              </span>
            </h2>

            <p className="mt-5 text-white/65 text-[15px] leading-7 max-w-[400px]">
              Don't worry if you forgot your password.
              Enter your registered email address and
              we'll help you securely recover your account.
            </p>

          </div>

          <div className="relative z-10 text-sm text-white/40">
            © {new Date().getFullYear()} The Fashion Hub
          </div>

        </div>


        {/* ==========================================
            RIGHT SIDE - FORGOT PASSWORD FORM
        ========================================== */}

        <div className="p-7 sm:p-10 lg:p-14 flex items-center">

          <div className="w-full max-w-[460px] mx-auto">

            {/* Back */}

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-gray-500
                hover:text-[#192b43]
                transition-colors
                mb-8
              "
            >
              <ArrowLeft size={17} />
              Back to Login
            </Link>


            {/* Mobile Logo */}

            <div className="lg:hidden mb-8">

              <Link to="/">
                <img
                  src="/assets/logof.png"
                  alt="The Fashion Hub"
                  className="w-[190px] h-auto object-contain"
                />
              </Link>

            </div>


            {/* Heading */}

            <div className="mb-8">

              <div className="w-14 h-14 rounded-2xl bg-[#d6b94f]/15 flex items-center justify-center mb-5">

                <Mail
                  size={26}
                  className="text-[#b59632]"
                />

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#192b43]">
                Forgot Password?
              </h1>

              <p className="mt-3 text-gray-500 text-sm sm:text-[15px] leading-6">
                Enter your registered email address and
                we'll send you a link to reset your password.
              </p>

            </div>


            {/* ======================================
                SUCCESS MESSAGE
            ====================================== */}

            {success && (

              <div className="
                mb-6
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-4
                py-4
                text-sm
                text-green-700
              ">

                <CheckCircle2
                  size={20}
                  className="shrink-0 mt-0.5"
                />

                <p>
                  {success}
                </p>

              </div>

            )}


            {/* ======================================
                ERROR MESSAGE
            ====================================== */}

            {error && (

              <div className="
                mb-6
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-4
                text-sm
                text-red-700
              ">

                <AlertCircle
                  size={20}
                  className="shrink-0 mt-0.5"
                />

                <p>
                  {error}
                </p>

              </div>

            )}


            {/* ======================================
                FORM
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-[#192b43]
                  "
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="
                      w-full
                      h-14
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      pl-12
                      pr-4
                      text-sm
                      text-gray-800
                      outline-none
                      transition-all

                      focus:border-[#d6b94f]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#d6b94f]/10
                    "
                  />

                </div>

              </div>


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-14
                  rounded-xl
                  bg-[#192b43]
                  text-white
                  font-semibold
                  transition-all
                  duration-300

                  hover:bg-[#243b59]
                  hover:-translate-y-[1px]
                  hover:shadow-lg

                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >

                {loading ? (

                  <span className="flex items-center justify-center gap-2">

                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Sending Reset Link...

                  </span>

                ) : (

                  "Send Reset Link"

                )}

              </button>

            </form>


            {/* ======================================
                BACK TO LOGIN
            ====================================== */}

            <div className="mt-8 text-center">

              <p className="text-sm text-gray-500">

                Remember your password?{" "}

                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-[#b59632]
                    hover:text-[#192b43]
                    transition-colors
                  "
                >
                  Login
                </Link>

              </p>

            </div>


            {/* Security */}

            <div className="
              mt-8
              pt-6
              border-t
              border-gray-100
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-gray-400
            ">

              <ShieldCheck size={15} />

              <span>
                Your account information is secure
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;