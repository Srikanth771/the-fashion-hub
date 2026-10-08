import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Banknote,
  Smartphone,
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  /* =========================================================
     LOAD CART
  ========================================================= */

  useEffect(() => {
    const savedCart = localStorage.getItem("fashionHubCart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
        } else {
          navigate("/cart");
        }
      } catch (error) {
        console.error("Invalid cart data:", error);
        navigate("/cart");
      }
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* =========================================================
     PRICE FUNCTION
  ========================================================= */

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
      Number(String(price).replace(/[₹,\s]/g, "")) || 0
    );
  };

  /* =========================================================
     PRICE FORMAT
  ========================================================= */

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     TOTALS
  ========================================================= */

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + getPrice(item) * (item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal >= 999 ? 0 : 49;

  const total = subtotal + deliveryCharge;

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Please enter your delivery address.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please select your state.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter your pincode.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const generatedOrderNumber = `FH${Date.now()
      .toString()
      .slice(-8)}`;

    const order = {
      orderNumber: generatedOrderNumber,

      customer: {
        ...formData,
      },

      products: cartItems,

      paymentMethod,

      subtotal,

      deliveryCharge,

      total,

      orderStatus: "Order Placed",

      createdAt: new Date().toISOString(),
    };

    /* =====================================================
       SAVE ORDER
    ===================================================== */

    const existingOrders =
      JSON.parse(
        localStorage.getItem("fashionHubOrders")
      ) || [];

    localStorage.setItem(
      "fashionHubOrders",
      JSON.stringify([
        ...existingOrders,
        order,
      ])
    );

    /* =====================================================
       CLEAR CART
    ===================================================== */

    localStorage.removeItem("fashionHubCart");

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    /* =====================================================
       SHOW SUCCESS
    ===================================================== */

    setOrderNumber(generatedOrderNumber);
    setOrderPlaced(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     ORDER SUCCESS PAGE
  ========================================================= */

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f8f6f0]">
        {/* HEADER */}

        <header className="bg-[#192b43]">
          <div
            className="
              mx-auto
              max-w-[1400px]
              px-6
              py-5
              sm:px-8
              lg:px-12
            "
          >
            <Link to="/" className="inline-flex">
              <span className="text-2xl font-bold text-white">
                The{" "}
                <span className="text-[#d6b94f]">
                  Fashion Hub
                </span>
              </span>
            </Link>
          </div>
        </header>

        {/* SUCCESS */}

        <main
          className="
            flex
            min-h-[75vh]
            items-center
            justify-center
            px-5
            py-12
          "
        >
          <div
            className="
              w-full
              max-w-[650px]
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-7
              text-center
              shadow-sm
              sm:p-10
            "
          >
            {/* SUCCESS ICON */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-green-50
              "
            >
              <CheckCircle2
                size={46}
                className="text-green-600"
              />
            </div>

            <h1
              className="
                mt-6
                text-3xl
                font-bold
                text-[#192b43]
              "
            >
              Order Placed Successfully!
            </h1>

            <p
              className="
                mx-auto
                mt-3
                max-w-[500px]
                text-sm
                leading-6
                text-gray-500
              "
            >
              Thank you for shopping with
              The Fashion Hub. Your order
              has been successfully placed.
            </p>

            {/* ORDER NUMBER */}

            <div
              className="
                mx-auto
                mt-7
                max-w-[400px]
                rounded-2xl
                bg-[#f8f6f0]
                p-5
              "
            >
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-gray-500
                "
              >
                Order Number
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-wide
                  text-[#192b43]
                "
              >
                #{orderNumber}
              </p>
            </div>

            {/* BUTTONS */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:justify-center
              "
            >
              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#192b43]
                  px-6
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#243b59]
                "
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>

              <Link
                to="/"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  px-6
                  py-3.5
                  font-semibold
                  text-[#192b43]
                  transition
                  hover:bg-gray-50
                "
              >
                Go to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     CHECKOUT PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* HEADER */}

      <header className="bg-[#192b43]">
        <div
          className="
            mx-auto
            flex
            max-w-[1400px]
            items-center
            justify-between
            px-6
            py-5
            sm:px-8
            lg:px-12
          "
        >
          {/* LOGO */}

          <Link to="/" className="inline-flex">
            <span className="text-2xl font-bold text-white">
              The{" "}
              <span className="text-[#d6b94f]">
                Fashion Hub
              </span>
            </span>
          </Link>

          {/* BACK TO CART */}

          <Link
            to="/cart"
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
            Back to Cart
          </Link>
        </div>
      </header>

      {/* MAIN */}

      <main
        className="
          mx-auto
          max-w-[1400px]
          px-5
          py-8
          sm:px-8
          sm:py-10
          lg:px-12
          lg:py-12
        "
      >
        {/* PAGE TITLE */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#d6b94f]/15
              "
            >
              <CreditCard
                size={22}
                className="text-[#b59632]"
              />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-[#192b43]
                  sm:text-3xl
                "
              >
                Checkout
              </h1>

              <p className="text-sm text-gray-500">
                Complete your order details
              </p>
            </div>
          </div>
        </div>

        {/* CHECKOUT GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-7
            lg:grid-cols-[1fr_390px]
          "
        >
          {/* LEFT SIDE */}

          <div className="space-y-6">
            {/* CUSTOMER INFORMATION */}

            <section
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-gray-100
                  pb-5
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d6b94f]/15
                  "
                >
                  <User
                    size={19}
                    className="text-[#b59632]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#192b43]">
                    Customer Information
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Enter your contact details
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {/* FULL NAME */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Full Name
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        outline-none
                        transition
                        ${
                          errors.fullName
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#192b43]"
                        }
                      `}
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* PHONE */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Mobile Number
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        outline-none
                        transition
                        ${
                          errors.phone
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#192b43]"
                        }
                      `}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div className="sm:col-span-2">
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Email Address
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        outline-none
                        transition
                        ${
                          errors.email
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#192b43]"
                        }
                      `}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* DELIVERY ADDRESS */}

            <section
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-gray-100
                  pb-5
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d6b94f]/15
                  "
                >
                  <MapPin
                    size={19}
                    className="text-[#b59632]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#192b43]">
                    Delivery Address
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {/* ADDRESS */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Complete Address
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="House/Flat No., Street, Area"
                    className={`
                      w-full
                      resize-none
                      rounded-xl
                      border
                      bg-white
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      ${
                        errors.address
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#192b43]"
                      }
                    `}
                  />

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* LANDMARK */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Landmark

                    <span
                      className="
                        ml-1
                        text-xs
                        font-normal
                        text-gray-400
                      "
                    >
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-[#192b43]
                    "
                  />
                </div>

                {/* CITY / STATE */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                  "
                >
                  {/* CITY */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-[#192b43]
                      "
                    >
                      City
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        ${
                          errors.city
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#192b43]"
                        }
                      `}
                    />

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* STATE */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-[#192b43]
                      "
                    >
                      State
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        ${
                          errors.state
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#192b43]"
                        }
                      `}
                    >
                      <option value="">
                        Select State
                      </option>

                      <option value="Andhra Pradesh">
                        Andhra Pradesh
                      </option>

                      <option value="Telangana">
                        Telangana
                      </option>

                      <option value="Maharashtra">
                        Maharashtra
                      </option>

                      <option value="Karnataka">
                        Karnataka
                      </option>

                      <option value="Tamil Nadu">
                        Tamil Nadu
                      </option>

                      <option value="Kerala">
                        Kerala
                      </option>

                      <option value="Delhi">
                        Delhi
                      </option>

                      <option value="Gujarat">
                        Gujarat
                      </option>

                      <option value="Rajasthan">
                        Rajasthan
                      </option>

                      <option value="West Bengal">
                        West Bengal
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>

                    {errors.state && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* PINCODE */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Pincode
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    placeholder="6-digit pincode"
                    className={`
                      w-full
                      rounded-xl
                      border
                      bg-white
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      sm:max-w-[250px]
                      ${
                        errors.pincode
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#192b43]"
                      }
                    `}
                  />

                  {errors.pincode && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                {/* ADDRESS TYPE */}

                <div>
                  <label
                    className="
                      mb-3
                      block
                      text-sm
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Address Type
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {["Home", "Work", "Other"].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              addressType: type,
                            }))
                          }
                          className={`
                            rounded-xl
                            border
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            transition
                            ${
                              formData.addressType === type
                                ? "border-[#192b43] bg-[#192b43] text-white"
                                : "border-gray-200 text-gray-600 hover:border-[#192b43]"
                            }
                          `}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* PAYMENT METHOD */}

            <section
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-gray-100
                  pb-5
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d6b94f]/15
                  "
                >
                  <CreditCard
                    size={19}
                    className="text-[#b59632]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#192b43]">
                    Payment Method
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Select your preferred payment method
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* COD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      paymentMethod === "cod"
                        ? "border-[#192b43] bg-[#192b43]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-green-50
                    "
                  >
                    <Banknote
                      size={21}
                      className="text-green-600"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#192b43]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order is delivered
                    </p>
                  </div>

                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      ${
                        paymentMethod === "cod"
                          ? "border-[#192b43]"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {paymentMethod === "cod" && (
                      <div
                        className="
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-[#192b43]
                        "
                      />
                    )}
                  </div>
                </button>

                {/* UPI */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      paymentMethod === "upi"
                        ? "border-[#192b43] bg-[#192b43]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                    "
                  >
                    <Smartphone
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#192b43]">
                      UPI
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay using Google Pay, PhonePe, Paytm
                    </p>
                  </div>

                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      ${
                        paymentMethod === "upi"
                          ? "border-[#192b43]"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {paymentMethod === "upi" && (
                      <div
                        className="
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-[#192b43]
                        "
                      />
                    )}
                  </div>
                </button>

                {/* CARD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      paymentMethod === "card"
                        ? "border-[#192b43] bg-[#192b43]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-50
                    "
                  >
                    <CreditCard
                      size={21}
                      className="text-purple-600"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#192b43]">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Secure online card payment
                    </p>
                  </div>

                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      ${
                        paymentMethod === "card"
                          ? "border-[#192b43]"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {paymentMethod === "card" && (
                      <div
                        className="
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-[#192b43]
                        "
                      />
                    )}
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE ORDER SUMMARY */}

          <aside>
            <div
              className="
                sticky
                top-6
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              {/* SUMMARY HEADING */}

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d6b94f]/15
                  "
                >
                  <ShoppingBag
                    size={19}
                    className="text-[#b59632]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#192b43]">
                    Order Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}

              <div
                className="
                  mt-6
                  space-y-4
                  border-b
                  border-gray-100
                  pb-6
                "
              >
                {cartItems.map((item) => {
                  const price = getPrice(item);
                  const quantity = item.quantity || 1;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          h-16
                          w-14
                          shrink-0
                          overflow-hidden
                          rounded-lg
                          bg-gray-100
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
                          "
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/product-placeholder.png";
                          }}
                        />

                        {/* QUANTITY BADGE */}

                        <span
                          className="
                            absolute
                            -right-0.5
                            -top-0.5
                            flex
                            h-5
                            min-w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-[#192b43]
                            px-1
                            text-[10px]
                            font-bold
                            text-white
                          "
                        >
                          {quantity}
                        </span>
                      </div>

                      {/* DETAILS */}

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            line-clamp-2
                            text-xs
                            font-semibold
                            text-[#192b43]
                          "
                        >
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {formatPrice(price)}
                        </p>
                      </div>

                      {/* TOTAL */}

                      <span
                        className="
                          shrink-0
                          text-sm
                          font-bold
                          text-[#192b43]
                        "
                      >
                        {formatPrice(price * quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* PRICE SUMMARY */}

              <div
                className="
                  space-y-4
                  border-b
                  border-gray-100
                  py-6
                "
              >
                {/* SUBTOTAL */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-sm
                  "
                >
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-800">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* DELIVERY */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-sm
                  "
                >
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="font-medium text-green-600">
                    {deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(deliveryCharge)}
                  </span>
                </div>
              </div>

              {/* TOTAL */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  py-5
                "
              >
                <span
                  className="
                    text-base
                    font-bold
                    text-[#192b43]
                  "
                >
                  Total
                </span>

                <span
                  className="
                    text-2xl
                    font-bold
                    text-[#192b43]
                  "
                >
                  {formatPrice(total)}
                </span>
              </div>

              {/* PLACE ORDER */}

              <button
                type="button"
                onClick={handlePlaceOrder}
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
                <CheckCircle2 size={18} />
                Place Order
              </button>

              {/* SECURITY */}

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  bg-[#f8f6f0]
                  p-4
                "
              >
                <ShieldCheck
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#b59632]
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Safe & Secure Checkout
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-5
                      text-gray-500
                    "
                  >
                    Your personal information is
                    protected and securely handled.
                  </p>
                </div>
              </div>

              {/* DELIVERY INFO */}

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                "
              >
                <Truck
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#b59632]
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[#192b43]
                    "
                  >
                    Estimated Delivery
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-5
                      text-gray-500
                    "
                  >
                    Delivery within 3–7 business days.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;