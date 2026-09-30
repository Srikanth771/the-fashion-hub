import React, { useState, useEffect } from "react";
import { Zap, Clock, Flame } from "lucide-react";
import ProductCatalog from "../components/products/ProductCatalog";

const FlashDealsPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 36, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Flash Deals Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-[#061A2D] text-white py-3 px-4 shadow-md">
        <div className="max-w-[1450px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-300 animate-bounce" size={20} />
            <span>FLASH DEALS - UP TO 70% OFF LIMITED TIME DISCOUNTS!</span>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-yellow-400/40">
            <Clock size={16} className="text-yellow-400" />
            <span>Deals End In: </span>
            <span className="font-mono text-yellow-300 font-extrabold">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <ProductCatalog
        pageTitle="Flash Deals & Hot Offers"
        breadcrumbTitle="Flash Deals"
        badgeText="Flash Deal"
        filterPredicate={(p) => p.isFlashDeal === true || p.discount}
      />
    </div>
  );
};

export default FlashDealsPage;
