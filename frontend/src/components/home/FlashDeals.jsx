"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Zap, ShoppingBag } from "lucide-react";

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) {
                days--;
              }
            }
          }
        }

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  return (
    <section className="w-full bg-[#f7f7f7] px-3 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
      <div
        className="
          relative mx-auto
          min-h-[360px]
          w-full
          max-w-[1480px]
          overflow-hidden
          rounded-xl
          bg-[#061a2d]
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          sm:min-h-[390px]
          lg:min-h-[420px]
        "
      >
        {/* =====================================================
            BACKGROUND DECORATIONS
        ====================================================== */}

        {/* Lightning glow */}
        <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#e7ad3d]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%] bg-[radial-gradient(circle_at_center,rgba(231,173,61,0.13),transparent_65%)]" />

        {/* Small floating particles */}
        <div className="absolute left-[8%] top-[20%] h-2 w-2 rotate-45 bg-[#e7ad3d] opacity-80" />
        <div className="absolute left-[35%] top-[13%] h-2 w-2 rotate-45 bg-[#e7ad3d] opacity-70" />
        <div className="absolute left-[38%] bottom-[15%] h-3 w-3 rotate-45 bg-[#e7ad3d] opacity-60" />
        <div className="absolute right-[8%] bottom-[18%] h-2 w-2 rotate-45 bg-[#e7ad3d] opacity-70" />

        {/* Lightning lines */}
        <div className="pointer-events-none absolute right-[3%] top-[-20px] h-[280px] w-[250px] opacity-30">
          <svg
            viewBox="0 0 250 280"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="M180 0L130 70L155 70L95 150L125 150L55 280"
              stroke="#d8e8ff"
              strokeWidth="1.5"
            />

            <path
              d="M230 40L190 100L210 100L160 160"
              stroke="#d8e8ff"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 flex min-h-[360px] flex-col lg:min-h-[420px] lg:flex-row">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div
            className="
              flex
              w-full
              flex-col
              justify-center
              px-6
              py-10
              sm:px-10
              lg:w-[53%]
              lg:px-14
              lg:py-12
              xl:px-20
            "
          >
            {/* FLASH DEALS LABEL */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e7ad3d] sm:h-8 sm:w-8">
                <Zap
                  size={18}
                  fill="currentColor"
                  className="text-[#061a2d]"
                />
              </div>

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#e7ad3d]
                  sm:text-xs
                "
              >
                Limited Time Offer
              </span>
            </div>

            {/* HEADING */}

            <h1
              className="
                max-w-[580px]
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                text-white
                sm:text-6xl
                md:text-7xl
                lg:text-[76px]
                xl:text-[86px]
              "
            >
              <span className="block">Flash</span>

              <span className="block text-[#e7ad3d]">
                Deals
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-[470px]
                text-xs
                leading-relaxed
                text-white/65
                sm:mt-5
                sm:text-sm
              "
            >
              Grab incredible deals on our best-selling products.
              Hurry, these offers won't last forever!
            </p>

            {/* CTA */}

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-7">
              <a
                href="/products"
                className="
                  group
                  inline-flex
                  min-h-[46px]
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-[#e7ad3d]
                  px-6
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#061a2d]
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:shadow-[0_8px_25px_rgba(231,173,61,0.25)]
                  sm:min-h-[50px]
                  sm:px-8
                "
              >
                <span>Shop Now</span>

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>

              <div className="flex items-center gap-2 text-[10px] text-white/50 sm:text-xs">
                <ShoppingBag size={15} />

                <span>Best prices guaranteed</span>
              </div>
            </div>
          </div>

          {/* =================================================
              CENTER OFFER
          ================================================== */}

          <div
            className="
              relative
              z-20
              flex
              w-full
              flex-col
              items-center
              justify-center
              px-5
              pb-10
              lg:w-[25%]
              lg:px-0
              lg:pb-0
            "
          >
            {/* UP TO */}

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                sm:text-sm
              "
            >
              Up To
            </span>

            {/* 70% */}

            <div className="mt-1 flex items-baseline">
              <span
                className="
                  text-6xl
                  font-black
                  leading-none
                  tracking-[-0.05em]
                  text-[#f0b943]
                  sm:text-7xl
                  lg:text-[82px]
                "
              >
                70
              </span>

              <span
                className="
                  text-3xl
                  font-black
                  text-[#f0b943]
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                %
              </span>
            </div>

            <span
              className="
                mt-[-3px]
                text-sm
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
                sm:text-base
              "
            >
              Off
            </span>

            {/* SUBTEXT */}

            <p className="mt-2 text-center text-[10px] text-white/55 sm:text-xs">
              On Best Selling Products
            </p>

            {/* =================================================
                COUNTDOWN
            ================================================== */}

            <div className="mt-5 flex items-center gap-1.5 sm:gap-2">
              <CountdownBox
                value={formatNumber(timeLeft.days)}
                label="Days"
              />

              <CountdownBox
                value={formatNumber(timeLeft.hours)}
                label="Hrs"
              />

              <CountdownBox
                value={formatNumber(timeLeft.minutes)}
                label="Mins"
              />

              <CountdownBox
                value={formatNumber(timeLeft.seconds)}
                label="Secs"
              />
            </div>
          </div>

          {/* =================================================
              RIGHT PRODUCT SHOWCASE
          ================================================== */}

          <div
            className="
              relative
              hidden
              w-[30%]
              items-center
              justify-center
              lg:flex
            "
          >
            {/* GOLD PLATFORM */}

            <div
              className="
                absolute
                bottom-[72px]
                left-[50%]
                h-[70px]
                w-[370px]
                -translate-x-1/2
                rounded-[50%]
                border
                border-[#f0c65e]/40
                bg-[#b88619]
                shadow-[0_20px_40px_rgba(0,0,0,0.3)]
              "
            />

            <div
              className="
                absolute
                bottom-[88px]
                left-[50%]
                h-[48px]
                w-[350px]
                -translate-x-1/2
                rounded-[50%]
                bg-[#e3af37]
              "
            />

            {/* PRODUCT 1 - EARBUDS */}

            <div
              className="
                absolute
                bottom-[125px]
                left-[14%]
                z-30
                flex
                h-[120px]
                w-[120px]
                items-center
                justify-center
                rounded-2xl
                bg-white
                shadow-[0_15px_35px_rgba(0,0,0,0.35)]
                transition-transform
                duration-500
                hover:-translate-y-2
              "
            >
              <div className="relative h-[72px] w-[72px] rounded-[20px] border-2 border-gray-200 bg-gray-50">
                <div className="absolute left-[18px] top-[14px] h-[30px] w-[14px] rounded-full bg-white shadow-md" />
                <div className="absolute right-[18px] top-[14px] h-[30px] w-[14px] rounded-full bg-white shadow-md" />
                <div className="absolute bottom-[8px] left-[24px] right-[24px] h-[4px] rounded-full bg-gray-200" />
              </div>
            </div>

            {/* PRODUCT 2 - WATCH */}

            <div
              className="
                absolute
                bottom-[140px]
                left-[43%]
                z-40
                flex
                h-[145px]
                w-[105px]
                items-center
                justify-center
                rounded-[24px]
                bg-[#111820]
                shadow-[0_18px_40px_rgba(0,0,0,0.45)]
                transition-transform
                duration-500
                hover:-translate-y-2
              "
            >
              {/* Strap */}

              <div className="absolute -top-10 h-[60px] w-[55px] rounded-t-[25px] bg-[#0b1118]" />

              <div className="absolute -bottom-10 h-[60px] w-[55px] rounded-b-[25px] bg-[#0b1118]" />

              {/* Watch screen */}

              <div
                className="
                  relative
                  z-10
                  flex
                  h-[90px]
                  w-[76px]
                  items-center
                  justify-center
                  rounded-[19px]
                  border-4
                  border-[#303943]
                  bg-[#05090e]
                "
              >
                <div className="text-center">
                  <p className="text-[17px] font-bold text-white">
                    10:28
                  </p>

                  <p className="mt-1 text-[7px] text-[#e7ad3d]">
                    MON 12
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCT 3 - SHOES */}

            <div
              className="
                absolute
                bottom-[95px]
                right-[4%]
                z-30
                h-[100px]
                w-[175px]
                rotate-[-5deg]
                rounded-[55%_45%_30%_25%]
                bg-[#e8f0eb]
                shadow-[0_18px_35px_rgba(0,0,0,0.35)]
                transition-transform
                duration-500
                hover:-translate-y-2
              "
            >
              <div className="absolute left-[38px] top-[30px] h-1 w-20 rotate-[8deg] bg-gray-300" />

              <div className="absolute left-[45px] top-[40px] h-1 w-16 rotate-[8deg] bg-gray-300" />

              <div className="absolute bottom-[-5px] left-[15px] h-[15px] w-[145px] rounded-full bg-white shadow-sm" />
            </div>

            {/* BEST PRICE TAG */}

            <div
              className="
                absolute
                bottom-[35px]
                left-[18%]
                z-50
                rotate-[10deg]
                rounded-sm
                bg-[#e7ad3d]
                px-5
                py-3
                text-center
                shadow-lg
              "
            >
              <p className="text-[11px] font-black uppercase leading-tight text-[#061a2d]">
                Best
                <br />
                Prices
              </p>

              {/* Tag hole */}

              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#061a2d]/30" />
            </div>

            {/* GOLD LIGHTNING */}

            <Zap
              size={42}
              fill="currentColor"
              className="
                absolute
                right-[10%]
                top-[15%]
                rotate-[10deg]
                text-[#e7ad3d]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   COUNTDOWN BOX
========================================================= */

const CountdownBox = ({ value, label }) => {
  return (
    <div
      className="
        flex
        h-[48px]
        w-[48px]
        flex-col
        items-center
        justify-center
        rounded-md
        border
        border-white/10
        bg-white/[0.07]
        sm:h-[55px]
        sm:w-[58px]
      "
    >
      <span
        className="
          text-base
          font-bold
          leading-none
          text-white
          sm:text-lg
        "
      >
        {value}
      </span>

      <span
        className="
          mt-1
          text-[7px]
          uppercase
          tracking-[0.1em]
          text-white/40
          sm:text-[8px]
        "
      >
        {label}
      </span>
    </div>
  );
};

export default FlashDeals;