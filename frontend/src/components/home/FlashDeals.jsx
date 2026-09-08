"use client";

import React from "react";
import { ArrowRight, Tag, Copy, Sparkles } from "lucide-react";

const FlashDeals = () => {
  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText("FASHION20");
    } catch (error) {
      console.log("Unable to copy coupon");
    }
  };

  return (
    <section className="w-full bg-[#13233f]">
      <div className="mx-auto flex min-h-[210px] w-full max-w-[1400px] items-center px-4 py-8 sm:min-h-[230px] sm:px-6 sm:py-10 lg:min-h-[250px] lg:px-8 lg:py-12">

        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto] md:gap-10 lg:gap-16">

          {/* ================= LEFT CONTENT ================= */}
          <div className="flex items-start gap-4 sm:gap-5">

            {/* ICON */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#c79816] bg-[#c79816] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
              <Tag
                size={22}
                strokeWidth={1.7}
                className="text-[#13233f] sm:h-6 sm:w-6 lg:h-7 lg:w-7"
              />
            </div>

            {/* TEXT */}
            <div className="min-w-0">

              {/* LABEL */}
              <div className="mb-2 flex items-center gap-2">
                <Sparkles
                  size={12}
                  className="text-[#c79816]"
                  strokeWidth={1.8}
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c79816] sm:text-[10px]">
                  Special Offer
                </span>
              </div>

              {/* HEADING */}
              <h2 className="text-[25px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[31px] md:text-[34px] lg:text-[40px]">
                Flat 20% Off
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-[620px] text-[11px] leading-relaxed text-white/65 sm:text-[12px] md:text-[13px]">
                Enjoy an exclusive discount on your next order.
                Shop your favorite styles and save more.
              </p>

              {/* CONDITIONS */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-white/50 sm:text-[10px]">
                <span>Orders above ₹999</span>

                <span className="hidden h-1 w-1 rounded-full bg-[#c79816] sm:block" />

                <span>Max discount ₹500</span>

                <span className="hidden h-1 w-1 rounded-full bg-[#c79816] sm:block" />

                <span>Limited period</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center md:flex-col md:items-end lg:flex-row lg:items-center">

            {/* COUPON */}
            <div className="flex items-center gap-3">

              <div className="border border-dashed border-[#c79816] bg-[#182b4b] px-4 py-3 sm:px-5 sm:py-3.5">
                <p className="mb-1 text-[7px] font-medium uppercase tracking-[0.2em] text-white/45">
                  Use coupon
                </p>

                <span className="text-[14px] font-bold tracking-[0.16em] text-[#c79816] sm:text-[16px]">
                  FASHION20
                </span>
              </div>

              <button
                type="button"
                onClick={copyCoupon}
                aria-label="Copy coupon code"
                className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-[#c79816] hover:bg-[#c79816] hover:text-[#13233f] active:scale-95 sm:h-11 sm:w-11"
              >
                <Copy size={15} strokeWidth={1.7} />
              </button>
            </div>

            {/* CTA */}
            <a
              href="/products"
              className="group flex min-h-[45px] items-center justify-center gap-2 bg-[#c79816] px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#13233f] transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-[0.98] sm:min-h-[48px] sm:px-6"
            >
              <span>Grab the Deal</span>

              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;