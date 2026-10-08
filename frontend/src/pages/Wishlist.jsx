import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  X,
} from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedWishlist =
          JSON.parse(
            localStorage.getItem("fashionHubWishlist")
          ) || [];

        setWishlistItems(savedWishlist);
      } catch (error) {
        console.error(
          "Error loading wishlist:",
          error
        );

        setWishlistItems([]);
      }
    };

    loadWishlist();

    window.addEventListener(
      "wishlistUpdated",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );
    };
  }, []);

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `₹${price.toLocaleString("en-IN")}`;
    }

    const numericPrice =
      Number(
        String(price || "").replace(/[₹,\s]/g, "")
      ) || 0;

    return `₹${numericPrice.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     GET PRICE
  ========================================================= */

  const getPrice = (product) => {
    const price =
      product.price ||
      product.discountPrice ||
      product.salePrice ||
      0;

    if (typeof price === "number") {
      return price;
    }

    return (
      Number(
        String(price).replace(/[₹,\s]/g, "")
      ) || 0
    );
  };

  /* =========================================================
     REMOVE FROM WISHLIST
  ========================================================= */

  const removeFromWishlist = (productId) => {
    const updatedWishlist =
      wishlistItems.filter(
        (item) => item.id !== productId
      );

    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "fashionHubWishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  /* =========================================================
     CLEAR WISHLIST
  ========================================================= */

  const clearWishlist = () => {
    setWishlistItems([]);

    localStorage.removeItem(
      "fashionHubWishlist"
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product) => {
    try {
      const existingCart =
        JSON.parse(
          localStorage.getItem("fashionHubCart")
        ) || [];

      const existingItem =
        existingCart.find(
          (item) => item.id === product.id
        );

      let updatedCart;

      if (existingItem) {
        updatedCart = existingCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    (item.quantity || 1) + 1,
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

      setAddedToCart((prev) => ({
        ...prev,
        [product.id]: true,
      }));

      setTimeout(() => {
        setAddedToCart((prev) => ({
          ...prev,
          [product.id]: false,
        }));
      }, 1800);
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );
    }
  };

  /* =========================================================
     MOVE TO CART
  ========================================================= */

  const moveToCart = (product) => {
    addToCart(product);

    setTimeout(() => {
      removeFromWishlist(product.id);
    }, 100);
  };

  /* =========================================================
     IMAGE
  ========================================================= */

  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }

    if (
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images[0];
    }

    return "/images/product-placeholder.png";
  };

  /* =========================================================
     EMPTY WISHLIST
  ========================================================= */

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f6f0]">

        {/* HEADER */}

        <header className="bg-[#192b43]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

            <Link
              to="/"
              className="inline-flex"
            >
              <span className="text-xl font-bold text-white sm:text-2xl">
                The{" "}
                <span className="text-[#d6b94f]">
                  Fashion Hub
                </span>
              </span>
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-2 text-xs font-medium text-white/80 transition hover:text-[#d6b94f] sm:text-sm"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </header>

        {/* EMPTY STATE */}

        <main className="flex min-h-[70vh] items-center justify-center px-5 py-10">

          <div className="w-full max-w-[500px] text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm sm:h-24 sm:w-24">
              <Heart
                size={40}
                strokeWidth={1.5}
                className="text-[#d6b94f] sm:h-[46px] sm:w-[46px]"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-[#192b43] sm:text-3xl">
              Your Wishlist is Empty
            </h1>

            <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-gray-500">
              Save your favorite products and
              find them here whenever you are ready
              to shop.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#192b43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#243b59]"
            >
              <ShoppingBag size={17} />
              Start Shopping
            </Link>

          </div>

        </main>
      </div>
    );
  }

  /* =========================================================
     WISHLIST PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f6f0]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-[#192b43]">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

          <Link
            to="/"
            className="inline-flex"
          >
            <span className="text-xl font-bold text-white sm:text-2xl">
              The{" "}
              <span className="text-[#d6b94f]">
                Fashion Hub
              </span>
            </span>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 text-xs font-medium text-white/80 transition hover:text-[#d6b94f] sm:text-sm"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-5 flex items-center justify-between border-b border-[#ddd7c9] pb-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d6b94f]/15">

              <Heart
                size={19}
                className="fill-[#d6b94f] text-[#b59632]"
              />

            </div>

            <div>

              <h1 className="text-xl font-bold text-[#192b43] sm:text-2xl">
                My Wishlist
              </h1>

              <p className="text-xs text-gray-500 sm:text-sm">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1
                  ? "item"
                  : "items"}{" "}
                saved
              </p>

            </div>

          </div>

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearWishlist}
            className="flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-700 sm:text-sm"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">
              Clear Wishlist
            </span>
            <span className="sm:hidden">
              Clear
            </span>
          </button>

        </div>

        {/* ===================================================
            WISHLIST LIST
        =================================================== */}

        <div className="flex flex-col gap-3">

          {wishlistItems.map((product) => {

            const price = getPrice(product);

            const oldPrice =
              product.oldPrice ||
              product.originalPrice ||
              product.mrp;

            const image =
              getProductImage(product);

            const isOutOfStock =
              product.stock === 0 ||
              product.outOfStock === true;

            const isAdded =
              addedToCart[product.id];

            return (
              <div
                key={product.id}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#e2ded4]
                  bg-white
                  p-2.5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-[#d6b94f]
                  hover:shadow-md
                  sm:gap-4
                  sm:p-3
                  md:p-4
                "
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <Link
                  to={`/product/${product.id}`}
                  className="
                    relative
                    h-[90px]
                    w-[75px]
                    flex-shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-gray-100
                    sm:h-[105px]
                    sm:w-[85px]
                    md:h-[115px]
                    md:w-[95px]
                  "
                >

                  <img
                    src={image}
                    alt={
                      product.name ||
                      "Product"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/product-placeholder.png";
                    }}
                  />

                  {/* DISCOUNT */}

                  {product.discount && (
                    <span className="absolute left-1 top-1 rounded bg-[#192b43] px-1.5 py-0.5 text-[8px] font-bold text-white">
                      {product.discount}
                    </span>
                  )}

                </Link>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="min-w-0 flex-1">

                  {/* BRAND */}

                  {product.brand && (
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#b59632] sm:text-[10px]">
                      {product.brand}
                    </p>
                  )}

                  {/* NAME */}

                  <Link
                    to={`/product/${product.id}`}
                  >
                    <h2 className="mt-1 line-clamp-1 text-sm font-semibold text-[#192b43] transition hover:text-[#b59632] sm:text-base md:text-[17px]">
                      {product.name ||
                        "Fashion Product"}
                    </h2>
                  </Link>

                  {/* RATING */}

                  {product.rating && (
                    <div className="mt-1 flex items-center gap-1">

                      <Star
                        size={12}
                        fill="currentColor"
                        className="text-[#d6b94f]"
                      />

                      <span className="text-[10px] text-gray-600 sm:text-xs">
                        {product.rating}
                      </span>

                      {product.reviews && (
                        <>
                          <span className="text-[10px] text-gray-400">
                            ·
                          </span>

                          <span className="text-[10px] text-gray-500 sm:text-xs">
                            {product.reviews} reviews
                          </span>
                        </>
                      )}

                    </div>
                  )}

                  {/* PRICE */}

                  <div className="mt-1.5 flex items-center gap-2">

                    <span className="text-sm font-bold text-[#192b43] sm:text-base">
                      {formatPrice(price)}
                    </span>

                    {oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                        {formatPrice(
                          oldPrice
                        )}
                      </span>
                    )}

                  </div>

                  {/* STOCK */}

                  {isOutOfStock && (
                    <span className="mt-1 inline-block text-[10px] font-semibold text-red-500">
                      Out of Stock
                    </span>
                  )}

                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() =>
                      addToCart(product)
                    }
                    className={`
                      flex
                      h-9
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      px-3
                      text-[10px]
                      font-semibold
                      transition-all
                      sm:h-10
                      sm:px-4
                      sm:text-xs
                      ${
                        isOutOfStock
                          ? "cursor-not-allowed bg-gray-200 text-gray-400"
                          : isAdded
                          ? "bg-green-600 text-white"
                          : "bg-[#192b43] text-white hover:bg-[#243b59]"
                      }
                    `}
                  >

                    {isOutOfStock ? (
                      "Out of Stock"
                    ) : isAdded ? (
                      <>
                        <Check size={14} />
                        <span className="hidden sm:inline">
                          Added
                        </span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart
                          size={14}
                        />
                        <span className="hidden sm:inline">
                          Add to Cart
                        </span>
                      </>
                    )}

                  </button>

                  {/* MOVE TO CART */}

                  {!isOutOfStock && (
                    <button
                      type="button"
                      onClick={() =>
                        moveToCart(product)
                      }
                      className="
                        hidden
                        h-10
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-[#d6b94f]
                        px-3
                        text-xs
                        font-semibold
                        text-[#8f7522]
                        transition
                        hover:bg-[#d6b94f]/10
                        md:flex
                      "
                    >
                      Move to Cart
                    </button>
                  )}

                  {/* REMOVE */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
                    aria-label="Remove from wishlist"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      text-gray-400
                      transition
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-500
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <X size={16} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* ===================================================
            CONTINUE SHOPPING
        =================================================== */}

        <div className="mt-6 border-t border-[#ddd7c9] pt-5">

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#192b43]
              transition
              hover:text-[#b59632]
            "
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

        </div>

      </main>
    </div>
  );
};

export default Wishlist;