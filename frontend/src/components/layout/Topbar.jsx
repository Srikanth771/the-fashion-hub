import React from "react";
import {
  Phone,
  Mail,
  Truck,
  CircleHelp,
  RotateCcw,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-200 border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-10 overflow-hidden px-6">

        {/* Announcement Marquee */}
        <div className="flex-1 overflow-hidden whitespace-nowrap mr-6">
          <div className="inline-flex items-center gap-10 animate-marquee">

            <div className="flex items-center gap-2">
              <Truck size={15} className="text-yellow-400" />
              <span className="text-sm">
                Free Shipping on Orders Above ₹999
              </span>
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw size={15} className="text-yellow-400" />
              <span className="text-sm">
                Easy 14-Day Returns
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Truck size={15} className="text-yellow-400" />
              <span className="text-sm">
                Cash On Delivery available
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={15} className="text-yellow-400" />
              <span className="text-sm">
                +91 6309382716
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={15} className="text-yellow-400" />
              <span className="text-sm">
                support@thefashionhub.com
              </span>
            </div>

          </div>
        </div>

        {/* Right Side */}
        {/* <div className="flex items-center gap-5 shrink-0">

          <a
            href="/track-order"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <Truck size={15} />
            <span className="text-sm">Track Order</span>
          </a>

          <a
            href="/help"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <CircleHelp size={15} />
            <span className="text-sm">Help</span>
          </a>

          <div className="flex items-center gap-3 border-l border-gray-700 pl-4">

            <a
              href="#"
              className="hover:text-yellow-400 transition hover:scale-110"
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="#"
              className="hover:text-yellow-400 transition hover:scale-110"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="#"
              className="hover:text-yellow-400 transition hover:scale-110"
            >
              <FaXTwitter size={15} />
            </a>

          </div>

        </div> */}

      </div>

    </div>
  );
};

export default Topbar;