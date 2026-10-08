import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Star, ShoppingCart } from "lucide-react";

const newArrivals = [
  {
    id: 1,
    brand: "CORSO",
    name: "Washed Linen Shirt",
    price: "₹1,899",
    oldPrice: "₹2,999",
    discount: "37% OFF",
    rating: "4.7",
    reviews: "164",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 2,
    brand: "CORSO",
    name: "Olive Bomber Jacket",
    price: "₹3,499",
    oldPrice: "₹5,499",
    discount: "36% OFF",
    rating: "4.8",
    reviews: "97",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 3,
    brand: "RIVAAYAT",
    name: "Midnight Cotton Kurta",
    price: "₹1,999",
    oldPrice: "₹3,199",
    discount: null,
    rating: "4.5",
    reviews: "88",
    image:
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=85",
    outOfStock: true,
  },
  {
    id: 4,
    brand: "URBAN EDGE",
    name: "Classic Black T-Shirt",
    price: "₹899",
    oldPrice: "₹1,499",
    discount: "40% OFF",
    rating: "4.6",
    reviews: "212",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 5,
    brand: "MONARCH",
    name: "Slim Fit Blue Jeans",
    price: "₹2,299",
    oldPrice: "₹3,499",
    discount: "34% OFF",
    rating: "4.7",
    reviews: "143",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 6,
    brand: "NORTHLINE",
    name: "Relaxed Fit Hoodie",
    price: "₹1,799",
    oldPrice: "₹2,799",
    discount: "36% OFF",
    rating: "4.8",
    reviews: "119",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 7,
    brand: "CORSO",
    name: "Beige Casual Trousers",
    price: "₹1,699",
    oldPrice: "₹2,499",
    discount: "32% OFF",
    rating: "4.5",
    reviews: "76",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 8,
    brand: "RIVAAYAT",
    name: "Premium White Kurta",
    price: "₹2,199",
    oldPrice: "₹3,499",
    discount: "37% OFF",
    rating: "4.9",
    reviews: "184",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 9,
    brand: "URBAN EDGE",
    name: "Oversized Green Shirt",
    price: "₹1,499",
    oldPrice: "₹2,299",
    discount: "35% OFF",
    rating: "4.6",
    reviews: "91",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
  {
    id: 10,
    brand: "MONARCH",
    name: "Classic Denim Jacket",
    price: "₹2,799",
    oldPrice: "₹4,299",
    discount: "35% OFF",
    rating: "4.8",
    reviews: "156",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    outOfStock: false,
  },
];

const NewArrivals = () => {
  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (product) => {
    if (product.outOfStock) return;

    console.log("Added to cart:", product);

    // You can connect your Redux/cart logic here later.
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = (product) => {
    console.log("Added to wishlist:", product);
  };

  return (
    <section className="w-full bg-[#faf7ef] py-10 sm:py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-7 flex items-end justify-between sm:mb-8 md:mb-10">

          <div>
            <p
              className="
                mb-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-[#242424]
                sm:text-[11px]
              "
            >
              JUST LANDED
            </p>

            <h2
              className="
                text-[30px]
                font-semibold
                leading-none
                tracking-[-0.02em]
                text-[#13233f]
                sm:text-[34px]
                md:text-[38px]
                lg:text-[40px]
              "
            >
              New Arrivals
            </h2>
          </div>

          {/* =========================
              DESKTOP VIEW ALL
          ========================== */}
          <a
            href="/new-arrivals"
            className="
              group
              hidden
              items-center
              gap-2
              text-[12px]
              font-medium
              text-[#13233f]
              transition-all
              duration-300
              hover:text-black
              hover:underline
              sm:flex
              md:text-[13px]
            "
          >
            <span>View all</span>

            <ArrowRight
              size={17}
              strokeWidth={1.6}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </div>

        {/* =========================
            PRODUCT GRID
            5 COLUMNS × 2 ROWS
        ========================== */}
        <div
          className="
            grid
            grid-cols-2
            gap-x-3
            gap-y-5
            sm:grid-cols-2
            sm:gap-5
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            xl:gap-5
          "
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="
                group
                relative
                cursor-pointer
                overflow-hidden
                border
                border-[#ddd7c9]
                bg-white
                shadow-[0_1px_4px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
              "
            >

              {/* =========================
                  IMAGE
              ========================== */}
              <div
                className="
                  relative
                  h-[200px]
                  overflow-hidden
                  bg-[#f6d19d]
                  sm:h-[230px]
                  md:h-[220px]
                  lg:h-[230px]
                  xl:h-[245px]
                "
              >

                {/* PRODUCT IMAGE */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.05]
                    "
                  />
                </Link>

                {/* =========================
                    DISCOUNT
                ========================== */}
                {product.discount && (
                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      bg-[#d6b63d]
                      px-2
                      py-1
                      text-[8px]
                      font-medium
                      tracking-[0.14em]
                      text-black
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      sm:left-3
                      sm:top-3
                      sm:px-3
                      sm:py-1.5
                      sm:text-[10px]
                    "
                  >
                    {product.discount}
                  </div>
                )}

                {/* =========================
                    HEART / WISHLIST
                ========================== */}
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
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white/95
                    text-[#333]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-white
                    hover:text-red-500
                    hover:shadow-md
                    sm:right-3
                    sm:top-3
                    sm:h-10
                    sm:w-10
                  "
                >
                  <Heart
                    size={16}
                    strokeWidth={1.5}
                    className="
                      transition-all
                      duration-300
                      sm:h-[18px]
                      sm:w-[18px]
                    "
                  />
                </button>

                {/* =========================
                    OUT OF STOCK IMAGE LABEL
                ========================== */}
                {product.outOfStock && (
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      flex
                      h-7
                      items-center
                      justify-center
                      bg-[#343b4a]
                      text-[9px]
                      font-medium
                      tracking-wide
                      text-white
                      sm:h-8
                      sm:text-[11px]
                    "
                  >
                    Out of stock
                  </div>
                )}
              </div>

              {/* =========================
                  PRODUCT DETAILS
              ========================== */}
              <div className="bg-white px-3 py-3 sm:px-4 sm:py-4">

                {/* BRAND */}
                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-[#555]
                    sm:text-[10px]
                    md:text-[11px]
                  "
                >
                  {product.brand}
                </p>

                {/* PRODUCT NAME */}
                <Link to={`/product/${product.id}`}>
                  <h3
                    className="
                      mt-1.5
                      line-clamp-1
                      cursor-pointer
                      text-[11px]
                      font-medium
                      leading-snug
                      text-[#161616]
                      transition-colors
                      duration-300
                      group-hover:text-[#13233f]
                      hover:underline
                      sm:mt-2
                      sm:text-[13px]
                      md:text-[14px]
                    "
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* =========================
                    PRICE
                ========================== */}
                <div
                  className="
                    mt-1.5
                    flex
                    items-center
                    gap-1.5
                    sm:mt-2
                    sm:gap-2
                  "
                >
                  <span
                    className="
                      text-[11px]
                      font-medium
                      text-[#c79816]
                      sm:text-[13px]
                      md:text-[14px]
                    "
                  >
                    {product.price}
                  </span>

                  <span
                    className="
                      text-[9px]
                      text-gray-500
                      line-through
                      sm:text-[12px]
                      md:text-[13px]
                    "
                  >
                    {product.oldPrice}
                  </span>
                </div>

                {/* =========================
                    RATING
                ========================== */}
                <div
                  className="
                    mt-1.5
                    flex
                    items-center
                    gap-1
                    sm:mt-2
                    sm:gap-1.5
                  "
                >
                  <Star
                    size={11}
                    fill="currentColor"
                    strokeWidth={1}
                    className="text-[#c79816] sm:h-[13px] sm:w-[13px]"
                  />

                  <span className="text-[9px] text-gray-600 sm:text-[11px]">
                    {product.rating}
                  </span>

                  <span className="text-[9px] text-gray-400 sm:text-[11px]">
                    ·
                  </span>

                  <span className="text-[9px] text-gray-500 sm:text-[11px]">
                    {product.reviews} reviews
                  </span>
                </div>

                {/* =========================
                    ADD TO CART BUTTON
                ========================== */}
                <button
                  type="button"
                  disabled={product.outOfStock}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className={`
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    py-2.5
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    transition-all
                    duration-300
                    sm:mt-4
                    sm:py-3
                    sm:text-[10px]
                    md:text-[11px]

                    ${
                      product.outOfStock
                        ? `
                          cursor-not-allowed
                          bg-gray-200
                          text-gray-400
                        `
                        : `
                          bg-[#13233f]
                          text-white
                          hover:bg-[#c79816]
                          hover:text-black
                          hover:shadow-md
                          active:scale-[0.98]
                        `
                    }
                  `}
                >
                  {!product.outOfStock && (
                    <ShoppingCart
                      size={14}
                      strokeWidth={1.7}
                      className="
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />
                  )}

                  {product.outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* =========================
            MOBILE VIEW ALL
        ========================== */}
        <div className="mt-6 flex justify-end sm:hidden">
          <a
            href="/products"
            className="
              group
              flex
              items-center
              gap-2
              text-[12px]
              font-medium
              text-[#13233f]
              transition-colors
              duration-300
              hover:text-black
              hover:underline
            "
          >
            <span>View all</span>

            <ArrowRight
              size={16}
              strokeWidth={1.6}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;