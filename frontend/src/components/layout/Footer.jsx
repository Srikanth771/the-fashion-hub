import React from "react";
import { Link } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  /* =====================================================
      QUICK LINKS
  ====================================================== */

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Flash Deals", path: "/flash-deals" },
    { name: "Track Order", path: "/trackorder" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact Us", path: "/contactus" },
  ];

  /* =====================================================
      CUSTOMER SERVICE
  ====================================================== */

  const customerService = [
    { name: "Help Center", path: "/help-center" },
    { name: "Shipping & Returns", path: "/shipping" },
    { name: "Terms & Conditions", path: "/termsandconditions" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "FAQs", path: "/faqs" },
  ];

  /* =====================================================
      MY ACCOUNT
  ====================================================== */

  const myAccount = [
    { name: "My Profile", path: "/profile" },
    { name: "My Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Become a Seller", path: "/vendor/register" },
  ];

  return (
    <footer className="w-full bg-[#192b43] text-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12">

        <div
          className="
            grid
            grid-cols-1
            gap-y-12

            sm:grid-cols-2
            sm:gap-x-12

            lg:grid-cols-[1.6fr_1fr_1.15fr_1fr_1.35fr]
            lg:gap-x-12
          "
        >

          {/* =================================================
              BRAND SECTION
          ================================================= */}

          <div>

            {/* LOGO IMAGE */}

            <Link
              to="/"
              className="inline-block"
            >
              <img
                src="src/assets/logof.png"
                alt="The Fashion Hub"
                className="
                  h-auto
                  w-[190px]
                  object-contain

                  sm:w-[210px]

                  md:w-[230px]
                "
              />
            </Link>


            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[380px]
                text-sm
                leading-7
                text-white/70

                sm:text-[15px]

                md:text-base
              "
            >
              Discover refined menswear designed for modern confidence.
              From everyday essentials to statement pieces, elevate your
              wardrobe with The Fashion Hub.
            </p>


            {/* SOCIAL MEDIA */}

            <div className="mt-6 flex items-center gap-3">

              {/* WHATSAPP */}

              <a
                href="https://chat.whatsapp.com/HnhXHkfnpPd27fyVREauju?s=cl&p=a&mlu=4&ilr=4"
                aria-label="WhatsApp"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-white/15
                  bg-white/[0.05]
                  text-[#d6b94f]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#d6b94f]
                  hover:bg-[#d6b94f]
                  hover:text-[#192b43]
                "
              >
                <FaWhatsapp size={18} />
              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/thefashion__hub_?stkn=ZzNjcDVpdHZ5ZzM2"
                aria-label="Instagram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-white/15
                  bg-white/[0.05]
                  text-[#d6b94f]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#d6b94f]
                  hover:bg-[#d6b94f]
                  hover:text-[#192b43]
                "
              >
                <FaInstagram size={18} />
              </a>


              {/* FACEBOOK */}

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-white/15
                  bg-white/[0.05]
                  text-[#d6b94f]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#d6b94f]
                  hover:bg-[#d6b94f]
                  hover:text-[#192b43]
                "
              >
                <FaFacebookF size={17} />
              </a>


              {/* YOUTUBE */}

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-white/15
                  bg-white/[0.05]
                  text-[#d6b94f]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#d6b94f]
                  hover:bg-[#d6b94f]
                  hover:text-[#192b43]
                "
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>

            <h3
              className="
                mb-6
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#dfbc58]

                sm:text-[15px]
              "
            >
              Quick Links
            </h3>


            <ul className="space-y-4">

              {quickLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    className="
                      inline-block
                      text-sm
                      text-white/70
                      transition-all
                      duration-300

                      sm:text-[15px]

                      hover:translate-x-1
                      hover:text-[#dfbc58]
                    "
                  >
                    {item.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              CUSTOMER SERVICE
          ================================================= */}

          <div>

            <h3
              className="
                mb-6
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#dfbc58]

                sm:text-[15px]
              "
            >
              Customer Service
            </h3>


            <ul className="space-y-4">

              {customerService.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    className="
                      inline-block
                      text-sm
                      text-white/70
                      transition-all
                      duration-300

                      sm:text-[15px]

                      hover:translate-x-1
                      hover:text-[#dfbc58]
                    "
                  >
                    {item.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              MY ACCOUNT
          ================================================= */}

          <div>

            <h3
              className="
                mb-6
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#dfbc58]

                sm:text-[15px]
              "
            >
              My Account
            </h3>


            <ul className="space-y-4">

              {myAccount.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    className="
                      inline-block
                      text-sm
                      text-white/70
                      transition-all
                      duration-300

                      sm:text-[15px]

                      hover:translate-x-1
                      hover:text-[#dfbc58]
                    "
                  >
                    {item.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              CONTACT US
          ================================================= */}

          <div>

            <h3
              className="
                mb-6
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#dfbc58]

                sm:text-[15px]
              "
            >
              Contact Us
            </h3>


            <div className="space-y-5">

              {/* PHONE */}

              <a
                href="tel:+916309382716"
                className="group flex items-start gap-3"
              >

                <Phone
                  size={18}
                  strokeWidth={1.8}
                  className="
                    mt-[2px]
                    shrink-0
                    text-[#d6b94f]
                  "
                />

                <span
                  className="
                    text-sm
                    text-white/70
                    transition-colors

                    sm:text-[15px]

                    group-hover:text-[#dfbc58]
                  "
                >
                  +91 6309382716
                </span>

              </a>


              {/* EMAIL */}

              <a
                href="mailto:info@thefashionhub.com"
                className="group flex items-start gap-3"
              >

                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="
                    mt-[2px]
                    shrink-0
                    text-[#d6b94f]
                  "
                />

                <span
                  className="
                    break-all
                    text-sm
                    text-white/70
                    transition-colors

                    sm:text-[15px]

                    group-hover:text-[#dfbc58]
                  "
                >
                  info@thefashionhub.com
                </span>

              </a>


              {/* ADDRESS */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  strokeWidth={1.8}
                  className="
                    mt-[2px]
                    shrink-0
                    text-[#d6b94f]
                  "
                />

                <p
                  className="
                    text-sm
                    leading-6
                    text-white/70

                    sm:text-[15px]
                  "
                >
                  New Jewellary Market Bhainsa, Nirmal, Telangana-504103.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ====================================================== */}

      <div
        className="
          border-t
          border-white/10
          bg-[#101e31]
        "
      >

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1400px]
            flex-col
            gap-4
            px-6
            py-4

            sm:px-8

            md:flex-row
            md:items-center
            md:justify-between

            lg:px-12
          "
        >

          {/* COPYRIGHT */}

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={16}
              strokeWidth={1.8}
              className="text-[#d6b94f]"
            />

            <p className="text-xs text-white/60 sm:text-[13px]">
              © {currentYear} The Fashion Hub. All Rights Reserved.
            </p>

          </div>


          {/* PAYMENT METHODS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >

            <span className="mr-2 text-xs text-white/60">
              We Accept
            </span>


            {/* VISA */}

            <div
              className="
                flex
                h-7
                min-w-[52px]
                items-center
                justify-center
                rounded-[4px]
                bg-white
                px-2
                text-[15px]
                font-extrabold
                italic
                text-[#1a4f8a]
              "
            >
              VISA
            </div>


            {/* MASTERCARD */}

            <div
              className="
                flex
                h-7
                min-w-[50px]
                items-center
                justify-center
                rounded-[4px]
                bg-white
                px-2
              "
            >

              <div className="flex">

                <span className="h-5 w-5 rounded-full bg-red-500" />

                <span className="-ml-2.5 h-5 w-5 rounded-full bg-yellow-400" />

              </div>

            </div>


            {/* RUPAY */}

            <div
              className="
                flex
                h-7
                min-w-[55px]
                items-center
                justify-center
                rounded-[4px]
                bg-white
                px-2
                text-[11px]
                font-bold
                italic
                text-[#294d82]
              "
            >
              RuPay
            </div>


            {/* UPI */}

            <div
              className="
                flex
                h-7
                min-w-[50px]
                items-center
                justify-center
                rounded-[4px]
                bg-white
                px-2
                text-[13px]
                font-bold
                italic
                text-slate-600
              "
            >
              UPI
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;