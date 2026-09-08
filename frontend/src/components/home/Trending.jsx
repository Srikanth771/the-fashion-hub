"use client";

import React, { useRef } from "react";
import { Heart, ArrowLeft, ArrowRight, Star, ShoppingCart } from "lucide-react";

const trendingProducts = [
  {
    id: 1,
    brand: "CORSO",
    name: "Premium White Shirt",
    price: "₹1,799",
    oldPrice: "₹2,999",
    discount: "40% OFF",
    rating: "4.8",
    reviews: "231",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    brand: "URBAN EDGE",
    name: "Classic Black T-Shirt",
    price: "₹899",
    oldPrice: "₹1,499",
    discount: "40% OFF",
    rating: "4.7",
    reviews: "318",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    brand: "MONARCH",
    name: "Slim Fit Denim Jeans",
    price: "₹2,299",
    oldPrice: "₹3,499",
    discount: "34% OFF",
    rating: "4.6",
    reviews: "189",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    brand: "NORTHLINE",
    name: "Oversized Grey Hoodie",
    price: "₹1,999",
    oldPrice: "₹2,999",
    discount: "33% OFF",
    rating: "4.8",
    reviews: "276",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    brand: "RIVAAYAT",
    name: "Classic Cotton Kurta",
    price: "₹1,599",
    oldPrice: "₹2,499",
    discount: "36% OFF",
    rating: "4.7",
    reviews: "142",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    brand: "CORSO",
    name: "Olive Casual Jacket",
    price: "₹2,899",
    oldPrice: "₹4,499",
    discount: "35% OFF",
    rating: "4.9",
    reviews: "198",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    brand: "URBAN EDGE",
    name: "Relaxed Fit Green Shirt",
    price: "₹1,499",
    oldPrice: "₹2,299",
    discount: "35% OFF",
    rating: "4.6",
    reviews: "121",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    brand: "MONARCH",
    name: "Classic Denim Jacket",
    price: "₹2,799",
    oldPrice: "₹4,299",
    discount: "35% OFF",
    rating: "4.8",
    reviews: "164",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
  },
];

const TrendingNow = () => {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const card = slider.querySelector("[data-card]");

    if (!card) return;

    const cardWidth = card.offsetWidth;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const handleWishlist = (product) => {
    console.log("Wishlist:", product);
  };

  return (
    <section className="w-full bg-[#fffaf0] py-8 sm:py-2 md:py-3">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex items-end justify-between sm:mb-7 md:mb-8">
          <div>
            <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-[#242424] sm:text-[10px]">
              MOVING FAST
            </p>

            <h2 className="text-[26px] font-semibold leading-none tracking-tight text-[#13233f] sm:text-[30px] md:text-[34px] lg:text-[36px]">
              Trending Now
            </h2>
          </div>

          {/* DESKTOP VIEW ALL */}
          <div className="hidden items-center sm:flex">
            <a
              href="/products"
              className="group flex items-center gap-1.5 text-[11px] font-medium text-[#13233f] transition-all duration-300 hover:text-[#c79816] md:text-[12px]"
            >
              View all
              <ArrowRight
                size={15}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* ================= PRODUCT SLIDER ================= */}
        <div
          ref={sliderRef}
          className="
            flex
            w-full
            gap-3
            overflow-x-auto
            scroll-smooth
            pb-2
            sm:gap-4
            md:gap-5
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {trendingProducts.map((product) => (
            <article
  key={product.id}
  data-card
  className="
    group
    relative
    flex
    min-w-[calc(50%-6px)]
    max-w-[calc(50%-6px)]
    flex-shrink-0
    flex-col
    overflow-hidden
    rounded-2xl
    border
    border-[#e5e7eb]
    bg-white
    shadow-sm
    transition-all
    duration-500
    hover:-translate-y-1
    hover:shadow-lg

    sm:min-w-[220px]
    sm:max-w-[220px]

    md:min-w-[235px]
    md:max-w-[235px]

    lg:min-w-[245px]
    lg:max-w-[245px]

    xl:min-w-[250px]
    xl:max-w-[250px]
  "
>
              {/* ================= IMAGE ================= */}
              <div
                className="
                  relative
                  h-[180px]
                  w-full
                  overflow-hidden
                  bg-[#f6d19d]

                  sm:h-[220px]
                  md:h-[230px]
                  lg:h-[240px]
                "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* DISCOUNT */}
                <div
                  className="
                    absolute
                    left-2
                    top-2
                    bg-[#d6b63d]
                    px-2
                    py-1
                    text-[7px]
                    font-medium
                    tracking-wider
                    text-black

                    sm:left-2.5
                    sm:top-2.5
                    sm:text-[8px]

                    md:text-[9px]
                  "
                >
                  {product.discount}
                </div>

                {/* WISHLIST */}
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#333]
                    shadow
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-red-500

                    sm:right-2.5
                    sm:top-2.5
                    sm:h-8
                    sm:w-8
                  "
                >
                  <Heart size={14} strokeWidth={1.5} />
                </button>
              </div>

              {/* ================= PRODUCT DETAILS ================= */}
              <div className="flex flex-1 flex-col bg-white px-2.5 py-2.5 sm:px-3 sm:py-3">
                {/* BRAND */}
                <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-[#555] sm:text-[8px] md:text-[9px]">
                  {product.brand}
                </p>

                {/* NAME */}
                <h3 className="mt-1 line-clamp-1 text-[10px] font-medium leading-snug text-[#161616] transition-colors duration-300 group-hover:text-[#13233f] sm:text-[11px] md:text-[12px]">
                  {product.name}
                </h3>

                {/* PRICE */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-[#c79816] sm:text-[11px] md:text-[12px]">
                    {product.price}
                  </span>

                  <span className="text-[8px] text-gray-500 line-through sm:text-[9px] md:text-[10px]">
                    {product.oldPrice}
                  </span>
                </div>

                {/* RATING */}
                <div className="mt-1.5 flex items-center gap-1">
                  <Star
                    size={10}
                    fill="currentColor"
                    strokeWidth={1}
                    className="text-[#c79816] sm:h-[11px] sm:w-[11px]"
                  />

                  <span className="text-[8px] text-gray-600 sm:text-[9px]">
                    {product.rating}
                  </span>

                  <span className="text-[8px] text-gray-400">·</span>

                  <span className="text-[8px] text-gray-500 sm:text-[9px]">
                    {product.reviews} reviews
                  </span>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="
                    mt-2.5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-1.5
                    bg-[#13233f]
                    py-2
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#c79816]
                    hover:text-black
                    hover:shadow-md
                    active:scale-[0.98]

                    sm:py-2.5
                    sm:text-[9px]
                  "
                >
                  <ShoppingCart size={12} strokeWidth={1.7} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ================= BOTTOM CONTROLS ================= */}
        <div className="mt-4 flex items-center justify-between">
          {/* MOBILE VIEW ALL */}
          {/* <a
            href="/products"
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              font-medium
              text-[#13233f]
              transition-colors
              hover:text-[#c79816]

              sm:text-[11px]
            "
          >
            View all

            <ArrowRight
              size={14}
              strokeWidth={1.6}
            />
          </a> */}

          {/* ARROWS */}
          {/* <div className="flex items-center gap-1.5">

            <button
              type="button"
              onClick={() => scrollSlider("left")}
              aria-label="Previous products"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                border
                border-[#13233f]
                bg-white
                text-[#13233f]
                transition-all
                duration-300
                hover:bg-[#13233f]
                hover:text-white
                active:scale-95

                sm:h-9
                sm:w-9
              "
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.6}
              />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              aria-label="Next products"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                border
                border-[#13233f]
                bg-white
                text-[#13233f]
                transition-all
                duration-300
                hover:bg-[#13233f]
                hover:text-white
                active:scale-95

                sm:h-9
                sm:w-9
              "
            >
              <ArrowRight
                size={14}
                strokeWidth={1.6}
              />
            </button>

          </div> */}
        </div>
      </div>

      {/* HIDE SCROLLBAR */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TrendingNow;
