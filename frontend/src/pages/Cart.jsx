import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

/* =========================================================
   BUILT-IN TEST PRODUCTS
========================================================= */

const defaultProducts = [
  {
    id: "fashion-101",
    brand: "CORSO",
    name: "Premium Cotton Shirt",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    quantity: 1,
  },
  {
    id: "fashion-102",
    brand: "URBAN EDGE",
    name: "Slim Fit Denim Jeans",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    quantity: 1,
  },
];

/* =========================================================
   CART COMPONENT
========================================================= */

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  /* =======================================================
     LOAD CART FROM LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    const savedCart = localStorage.getItem("fashionHubCart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (
          Array.isArray(parsedCart) &&
          parsedCart.length > 0
        ) {
          setCartItems(parsedCart);
        } else {
          setCartItems(defaultProducts);

          localStorage.setItem(
            "fashionHubCart",
            JSON.stringify(defaultProducts)
          );
        }
      } catch (error) {
        console.error("Invalid cart data:", error);

        setCartItems(defaultProducts);

        localStorage.setItem(
          "fashionHubCart",
          JSON.stringify(defaultProducts)
        );
      }
    } else {
      setCartItems(defaultProducts);

      localStorage.setItem(
        "fashionHubCart",
        JSON.stringify(defaultProducts)
      );
    }
  }, []);

  /* =======================================================
     SAVE CART TO LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        "fashionHubCart",
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems]);

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity =
            (item.quantity || 1) + change;

          return {
            ...item,
            quantity: Math.max(1, newQuantity),
          };
        }

        return item;
      })
    );
  };

  /* =======================================================
     REMOVE ITEM
  ======================================================= */

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("fashionHubCart");

    window.dispatchEvent(new Event("cartUpdated"));
  };

  /* =======================================================
     PRICE CALCULATION
  ======================================================= */

  const getPrice = (item) => {
    const price =
      item.price ||
      item.discountPrice ||
      item.salePrice ||
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

  /* =======================================================
     SUBTOTAL
  ======================================================= */

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      getPrice(item) * (item.quantity || 1),
    0
  );

  /* =======================================================
     DELIVERY CHARGE
  ======================================================= */

  const deliveryCharge =
    subtotal >= 999 || subtotal === 0
      ? 0
      : 49;

  /* =======================================================
     TOTAL
  ======================================================= */

  const total = subtotal + deliveryCharge;

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f6f0]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-[#192b43]">

          <div className="
            mx-auto
            max-w-[1400px]
            px-6
            py-5
            sm:px-8
            lg:px-12
          ">

            <Link
              to="/"
              className="inline-flex items-center"
            >

              <span className="
                text-2xl
                font-bold
                text-white
              ">
                The

                <span className="text-[#d6b94f]">
                  {" "}Fashion Hub
                </span>
              </span>

            </Link>

          </div>

        </div>

        {/* =================================================
            EMPTY CART
        ================================================= */}

        <div className="
          mx-auto
          flex
          min-h-[70vh]
          max-w-[700px]
          items-center
          justify-center
          px-6
        ">

          <div className="w-full text-center">

            {/* Icon */}

            <div className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-[#192b43]/5
            ">

              <ShoppingBag
                size={42}
                className="text-[#192b43]"
              />

            </div>

            {/* Heading */}

            <h1 className="
              mt-7
              text-3xl
              font-bold
              text-[#192b43]
              sm:text-4xl
            ">
              Your Cart is Empty
            </h1>

            {/* Description */}

            <p className="
              mx-auto
              mt-3
              max-w-[500px]
              text-sm
              leading-6
              text-gray-500
              sm:text-base
            ">
              Looks like you haven't added anything to
              your cart yet. Explore our latest collection
              and find something you love.
            </p>

            {/* Continue Shopping */}

            <Link
              to="/products"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#192b43]
                px-7
                py-3.5
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#243b59]
                hover:shadow-lg
              "
            >

              <ShoppingBag size={18} />

              Continue Shopping

            </Link>

          </div>

        </div>

      </div>
    );
  }

  /* =========================================================
     MAIN CART PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f6f0]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-[#192b43]">

        <div className="
          mx-auto
          flex
          max-w-[1400px]
          items-center
          justify-between
          px-6
          py-5
          sm:px-8
          lg:px-12
        ">

          {/* Logo */}

          <Link
            to="/"
            className="inline-flex items-center"
          >

            <span className="
              text-2xl
              font-bold
              text-white
            ">

              The

              <span className="text-[#d6b94f]">
                {" "}Fashion Hub
              </span>

            </span>

          </Link>

          {/* Continue Shopping */}

          <Link
            to="/products"
            className="
              hidden
              items-center
              gap-2
              text-sm
              font-medium
              text-white/80
              transition
              hover:text-[#d6b94f]
              sm:flex
            "
          >

            <ArrowLeft size={17} />

            Continue Shopping

          </Link>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="
        mx-auto
        max-w-[1400px]
        px-5
        py-8
        sm:px-8
        sm:py-10
        lg:px-12
        lg:py-12
      ">

        {/* ===================================================
            PAGE HEADING
        =================================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            {/* Icon */}

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#d6b94f]/15
            ">

              <ShoppingBag
                size={22}
                className="text-[#b59632]"
              />

            </div>

            {/* Heading */}

            <div>

              <h1 className="
                text-2xl
                font-bold
                text-[#192b43]
                sm:text-3xl
              ">
                Shopping Cart
              </h1>

              <p className="text-sm text-gray-500">

                {cartItems.reduce(
                  (total, item) =>
                    total + (item.quantity || 1),
                  0
                )}

                {" "}

                {cartItems.reduce(
                  (total, item) =>
                    total + (item.quantity || 1),
                  0
                ) === 1
                  ? "item"
                  : "items"}

                {" "}in your cart

              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            CART + SUMMARY
        =================================================== */}

        <div className="
          grid
          grid-cols-1
          gap-7
          lg:grid-cols-[1fr_390px]
        ">

          {/* =================================================
              CART ITEMS
          ================================================= */}

          <div>

            <div className="
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-sm
            ">

              {/* Cart Header */}

              <div className="
                hidden
                border-b
                border-gray-100
                px-6
                py-4
                sm:flex
                sm:items-center
                sm:justify-between
              ">

                <h2 className="
                  font-semibold
                  text-[#192b43]
                ">
                  Cart Items
                </h2>

                <button
                  type="button"
                  onClick={clearCart}
                  className="
                    text-xs
                    font-medium
                    text-red-500
                    transition
                    hover:text-red-700
                  "
                >
                  Clear Cart
                </button>

              </div>

              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <div className="divide-y divide-gray-100">

                {cartItems.map((item) => {

                  const price = getPrice(item);

                  const quantity =
                    item.quantity || 1;

                  return (
                    <div
                      key={item.id}
                      className="
                        p-4
                        sm:p-6
                      "
                    >

                      <div className="
                        flex
                        gap-4
                        sm:gap-6
                      ">

                        {/* =================================================
                            PRODUCT IMAGE
                        ================================================= */}

                        <Link
                          to={`/product/${item.id}`}
                          className="
                            h-[110px]
                            w-[90px]
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                            sm:h-[135px]
                            sm:w-[115px]
                          "
                        >

                          <img
                            src={
                              item.image ||
                              item.images?.[0] ||
                              "/images/product-placeholder.png"
                            }
                            alt={item.name}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-300
                              hover:scale-105
                            "
                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/product-placeholder.png";
                            }}
                          />

                        </Link>

                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <div className="
                          min-w-0
                          flex-1
                        ">

                          <div className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          ">

                            <div>

                              {/* Brand */}

                              {item.brand && (
                                <p className="
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-[0.15em]
                                  text-[#b59632]
                                ">
                                  {item.brand}
                                </p>
                              )}

                              {/* Product Name */}

                              <Link
                                to={`/product/${item.id}`}
                                className="
                                  mt-1
                                  block
                                  line-clamp-2
                                  text-sm
                                  font-semibold
                                  text-[#192b43]
                                  transition
                                  hover:text-[#b59632]
                                  sm:text-base
                                "
                              >
                                {item.name}
                              </Link>

                            </div>

                            {/* Remove */}

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(item.id)
                              }
                              className="
                                shrink-0
                                text-gray-400
                                transition
                                hover:text-red-500
                              "
                              aria-label="Remove product"
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                          {/* =================================================
                              PRICE
                          ================================================= */}

                          <div className="mt-3">

                            <span className="
                              text-lg
                              font-bold
                              text-[#192b43]
                            ">
                              {formatPrice(price)}
                            </span>

                          </div>

                          {/* =================================================
                              QUANTITY + ITEM TOTAL
                          ================================================= */}

                          <div className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-3
                          ">

                            {/* Quantity */}

                            <div className="
                              flex
                              h-9
                              items-center
                              overflow-hidden
                              rounded-lg
                              border
                              border-gray-200
                            ">

                              {/* Minus */}

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    -1
                                  )
                                }
                                disabled={quantity <= 1}
                                className="
                                  flex
                                  h-full
                                  w-9
                                  items-center
                                  justify-center
                                  text-gray-500
                                  transition
                                  hover:bg-gray-50
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                "
                              >

                                <Minus size={14} />

                              </button>

                              {/* Quantity */}

                              <span className="
                                flex
                                h-full
                                min-w-[38px]
                                items-center
                                justify-center
                                border-x
                                border-gray-200
                                text-sm
                                font-semibold
                                text-[#192b43]
                              ">
                                {quantity}
                              </span>

                              {/* Plus */}

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    1
                                  )
                                }
                                className="
                                  flex
                                  h-full
                                  w-9
                                  items-center
                                  justify-center
                                  text-gray-500
                                  transition
                                  hover:bg-gray-50
                                "
                              >

                                <Plus size={14} />

                              </button>

                            </div>

                            {/* Item Total */}

                            <span className="
                              text-sm
                              font-bold
                              text-[#192b43]
                              sm:text-base
                            ">
                              {formatPrice(
                                price * quantity
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                MOBILE CONTINUE SHOPPING
            ================================================= */}

            <div className="mt-5 sm:hidden">

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#192b43]
                  hover:text-[#b59632]
                "
              >

                <ArrowLeft size={17} />

                Continue Shopping

              </Link>

            </div>

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside>

            <div className="
              sticky
              top-6
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              sm:p-6
            ">

              {/* Heading */}

              <h2 className="
                text-lg
                font-bold
                text-[#192b43]
              ">
                Order Summary
              </h2>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="
                mt-6
                space-y-4
                border-b
                border-gray-100
                pb-6
              ">

                {/* Subtotal */}

                <div className="
                  flex
                  items-center
                  justify-between
                  text-sm
                ">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="
                    font-medium
                    text-gray-800
                  ">
                    {formatPrice(subtotal)}
                  </span>

                </div>

                {/* Delivery */}

                <div className="
                  flex
                  items-center
                  justify-between
                  text-sm
                ">

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="
                    font-medium
                    text-green-600
                  ">
                    {deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(deliveryCharge)}
                  </span>

                </div>

              </div>

              {/* =================================================
                  TOTAL
              ================================================= */}

              <div className="
                flex
                items-center
                justify-between
                py-5
              ">

                <span className="
                  text-base
                  font-bold
                  text-[#192b43]
                ">
                  Total
                </span>

                <span className="
                  text-2xl
                  font-bold
                  text-[#192b43]
                ">
                  {formatPrice(total)}
                </span>

              </div>

              {/* =================================================
                  CHECKOUT BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#192b43]
                  px-5
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#243b59]
                  hover:shadow-lg
                "
              >

                <CreditCard size={18} />

                Proceed to Checkout

              </button>

              {/* =================================================
                  BENEFITS
              ================================================= */}

              <div className="
                mt-6
                space-y-4
                border-t
                border-gray-100
                pt-6
              ">

                {/* Free Delivery */}

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <Truck
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                      text-[#b59632]
                    "
                  />

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-[#192b43]
                    ">
                      Free Delivery
                    </p>

                    <p className="
                      mt-1
                      text-xs
                      leading-5
                      text-gray-500
                    ">
                      Free delivery on orders above ₹999
                    </p>

                  </div>

                </div>

                {/* Secure Checkout */}

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <ShieldCheck
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                      text-[#b59632]
                    "
                  />

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-[#192b43]
                    ">
                      Secure Checkout
                    </p>

                    <p className="
                      mt-1
                      text-xs
                      leading-5
                      text-gray-500
                    ">
                      Your payment information is protected
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default Cart;