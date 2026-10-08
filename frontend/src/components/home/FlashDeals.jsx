"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Zap,
  ShoppingBag,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlashDeals = () => {
  const navigate = useNavigate();

  /* =========================================================
     FLASH DEAL PRODUCTS
  ========================================================= */

  const flashProducts = [
    {
      id: "flash-earbuds",
      brand: "FASHION HUB",
      name: "Premium Wireless Earbuds",
      price: 1299,
      oldPrice: 2499,
      discount: "48% OFF",
      category: "Electronics",
      image: null,
      type: "earbuds",
    },
    {
      id: "flash-watch",
      brand: "FASHION HUB",
      name: "Premium Smart Watch",
      price: 1799,
      oldPrice: 3499,
      discount: "49% OFF",
      category: "Accessories",
      image: null,
      type: "watch",
    },
    {
      id: "flash-shoes",
      brand: "FASHION HUB",
      name: "Premium Casual Shoes",
      price: 1499,
      oldPrice: 2999,
      discount: "50% OFF",
      category: "Footwear",
      image: null,
      type: "shoes",
    },
  ];

  /* =========================================================
     STATES
  ========================================================= */

  const [wishlist, setWishlist] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem("fashionHubWishlist")
      ) || [];

    setWishlist(savedWishlist);
  }, []);

  /* =========================================================
     COUNTDOWN TIMER
  ========================================================= */

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

  /* =========================================================
     FORMAT NUMBER
  ========================================================= */

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  /* =========================================================
     CHECK WISHLIST
  ========================================================= */

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  /* =========================================================
     TOGGLE WISHLIST
  ========================================================= */

  const toggleWishlist = (product) => {
    const existingWishlist =
      JSON.parse(
        localStorage.getItem("fashionHubWishlist")
      ) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = existingWishlist.filter(
        (item) => item.id !== product.id
      );
    } else {
      updatedWishlist = [
        ...existingWishlist,
        product,
      ];
    }

    localStorage.setItem(
      "fashionHubWishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("fashionHubCart")
      ) || [];

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "fashionHubCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/cart");
  };

  /* =========================================================
     PRODUCT VISUAL
  ========================================================= */

  const ProductVisual = ({ product }) => {
    if (product.type === "earbuds") {
      return (
        <div className="relative h-[82px] w-[82px] rounded-[22px] border-2 border-gray-200 bg-gray-50 shadow-inner">
          <div className="absolute left-[20px] top-[15px] h-[34px] w-[15px] rounded-full bg-white shadow-md" />

          <div className="absolute right-[20px] top-[15px] h-[34px] w-[15px] rounded-full bg-white shadow-md" />

          <div className="absolute bottom-[9px] left-[27px] right-[27px] h-[4px] rounded-full bg-gray-200" />
        </div>
      );
    }

    if (product.type === "watch") {
      return (
        <div className="relative flex h-[110px] w-[80px] items-center justify-center rounded-[22px] bg-[#111820] shadow-lg">
          {/* Strap */}

          <div className="absolute -top-9 h-[55px] w-[48px] rounded-t-[22px] bg-[#0b1118]" />

          <div className="absolute -bottom-9 h-[55px] w-[48px] rounded-b-[22px] bg-[#0b1118]" />

          {/* Screen */}

          <div className="relative z-10 flex h-[72px] w-[62px] items-center justify-center rounded-[16px] border-4 border-[#303943] bg-[#05090e]">
            <div className="text-center">
              <p className="text-[14px] font-bold text-white">
                10:28
              </p>

              <p className="mt-1 text-[6px] text-[#e7ad3d]">
                MON 12
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-[72px] w-[135px] rotate-[-5deg] rounded-[55%_45%_30%_25%] bg-[#e8f0eb] shadow-lg">
        <div className="absolute left-[30px] top-[23px] h-1 w-16 rotate-[8deg] bg-gray-300" />

        <div className="absolute left-[36px] top-[32px] h-1 w-14 rotate-[8deg] bg-gray-300" />

        <div className="absolute bottom-[-4px] left-[12px] h-[12px] w-[112px] rounded-full bg-white shadow-sm" />
      </div>
    );
  };

  /* =========================================================
     PRODUCT CARD
  ========================================================= */

  const ProductCard = ({ product }) => {
    const active = isWishlisted(product.id);

    return (
      <div
        className="
          group
          relative
          w-[150px]
          sm:w-[165px]
        "
      >
        {/* PRODUCT IMAGE AREA */}

        <div
          className="
            relative
            flex
            h-[145px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-white
            shadow-[0_12px_30px_rgba(0,0,0,0.25)]
            transition-all
            duration-300
            group-hover:-translate-y-2
            sm:h-[155px]
          "
        >
          {/* DISCOUNT */}

          <div className="absolute left-2 top-2 z-50 rounded-md bg-[#e7ad3d] px-2 py-1">
            <span className="text-[8px] font-black text-[#061a2d]">
              {product.discount}
            </span>
          </div>

          {/* WISHLIST */}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="
              absolute
              right-2
              top-2
              z-50
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
              transition-all
              duration-300
              hover:scale-110
            "
            aria-label={
              active
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <Heart
              size={16}
              className={
                active
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }
            />
          </button>

          {/* PRODUCT VISUAL */}

          <ProductVisual product={product} />
        </div>

        {/* PRODUCT DETAILS */}

        <div className="mt-3">
          <p className="text-[8px] font-bold tracking-[0.12em] text-[#e7ad3d]">
            {product.brand}
          </p>

          <h3 className="mt-1 truncate text-xs font-bold text-white">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-black text-[#e7ad3d]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="text-[9px] text-white/40 line-through">
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
          </div>

          {/* ADD TO CART */}

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="
              mt-2
              flex
              w-full
              items-center
              justify-center
              gap-1.5
              rounded-md
              bg-[#e7ad3d]
              px-3
              py-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.06em]
              text-[#061a2d]
              transition-all
              duration-300
              hover:bg-white
            "
          >
            <ShoppingCart size={13} />

            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#f7f7f7] px-3 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
      <div
        className="
          relative
          mx-auto
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
              lg:w-[43%]
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
                lg:text-[70px]
                xl:text-[80px]
              "
            >
              <span className="block">
                Flash
              </span>

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
              Grab incredible deals on our best-selling
              products. Hurry, these offers won't last
              forever!
            </p>

            {/* CTA */}

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-7">
              <button
                type="button"
                onClick={() => navigate("/products")}
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
                <span>
                  Shop Now
                </span>

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              <div className="flex items-center gap-2 text-[10px] text-white/50 sm:text-xs">
                <ShoppingBag size={15} />

                <span>
                  Best prices guaranteed
                </span>
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
              lg:w-[22%]
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

            {/* COUNTDOWN */}

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
              flex
              w-full
              items-center
              justify-center
              px-4
              pb-10
              lg:w-[35%]
              lg:px-0
              lg:pb-0
            "
          >
            {/* GOLD PLATFORM */}

            <div
              className="
                absolute
                bottom-[55px]
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
                bottom-[70px]
                left-[50%]
                h-[48px]
                w-[350px]
                -translate-x-1/2
                rounded-[50%]
                bg-[#e3af37]
              "
            />

            {/* PRODUCT CARDS */}

            <div
              className="
                relative
                z-30
                flex
                items-end
                justify-center
                gap-2
                sm:gap-4
              "
            >
              <ProductCard
                product={flashProducts[0]}
              />

              <ProductCard
                product={flashProducts[1]}
              />

              <ProductCard
                product={flashProducts[2]}
              />
            </div>

            {/* BEST PRICE TAG */}

            <div
              className="
                absolute
                bottom-[15px]
                left-[8%]
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

              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#061a2d]/30" />
            </div>

            {/* GOLD LIGHTNING */}

            <Zap
              size={42}
              fill="currentColor"
              className="
                absolute
                right-[5%]
                top-[10%]
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

const CountdownBox = ({
  value,
  label,
}) => {
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