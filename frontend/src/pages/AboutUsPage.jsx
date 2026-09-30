import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Users,
  Truck,
  Sparkles,
  HeartHandshake,
  Globe2,
  CheckCircle2
} from "lucide-react";

import logo from "../assets/logof.png";

const AboutUsPage = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 pt-4">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6">

        {/* Hero Section */}
        <div className="bg-[#061A2D] text-white rounded-2xl p-8 sm:p-12 md:p-16 mb-12 shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

          <div className="max-w-2xl relative z-10">
            <span className="text-[#D4AF37] font-bold text-xs tracking-[0.25em] uppercase mb-3 block">
              OUR STORY & HERITAGE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif leading-tight">
              Redefining Luxury & Everyday Elegance.
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
              Founded with a passion for exceptional craftsmanship and modern aesthetics, The Fashion Hub curates premium attire and lifestyle products designed to inspire confidence.
            </p>
          </div>
        </div>

        {/* Brand Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {[
            { number: "100K+", label: "Happy Customers Nationwide", icon: Users },
            { number: "500+", label: "Curated Luxury Brands", icon: Award },
            { number: "99.8%", label: "On-Time Express Deliveries", icon: Truck },
            { number: "15 Days", label: "Hassle-Free Return Guarantee", icon: ShieldCheck }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#061A2D]/5 flex items-center justify-center text-[#D4AF37] mb-3">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">{stat.number}</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">WHY CHOOSE US</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 font-serif">
              Crafted for Those Who Value Quality
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
              At The Fashion Hub, we believe that style is a form of self-expression. Every stitch, fabric selection, and design curve is meticulously evaluated to ensure you receive nothing short of perfection.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Uncompromising Fabric & Material Quality",
                "Sustainable & Ethical Sourcing Standards",
                "Direct-from-Brand Authenticity Guarantee",
                "Dedicated 24/7 VIP Customer Concierge"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 size={18} className="text-[#D4AF37]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[350px] bg-[#061A2D] flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
              alt="Fashion Studio"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 text-center text-white p-6">
              <img src={logo} alt="The Fashion Hub" className="h-16 mx-auto mb-4 object-contain" />
              <p className="text-sm font-serif italic max-w-md mx-auto text-gray-200">
                "Fashion passes, style remains. Our goal is to bring timeless fashion to every doorstep."
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#061A2D] to-[#102d4a] text-white p-8 sm:p-10 rounded-2xl text-center shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold font-serif">Ready to Explore Our Latest Collections?</h3>
          <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Discover thousands of handpicked products with exclusive member discounts today.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#c49f2b] transition shadow"
            >
              BROWSE CATALOG
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition"
            >
              CONTACT US
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;
