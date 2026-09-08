import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// HERO IMAGES
// ==========================================

import hero1 from "../../assets/hero/hero-1.jpeg";
import hero2 from "../../assets/hero/hero-2.jpeg";
import hero3 from "../../assets/hero/hero-3.jpeg";
import hero4 from "../../assets/hero/hero-4.jpeg";

// ==========================================
// BANNERS
// Add / remove images from here
// ==========================================

const banners = [
  {
    id: 1,
    image: hero1,
  },
  {
    id: 2,
    image: hero2,
  },
  {
    id: 3,
    image: hero3,
  },
  {
    id: 4,
    image: hero4,
  },
];

// ==========================================
// HERO COMPONENT
// ==========================================

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ========================================
  // NEXT SLIDE
  // ========================================

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  // ========================================
  // PREVIOUS SLIDE
  // ========================================

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // ========================================
  // GO TO SLIDE
  // ========================================

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // ========================================
  // AUTO SLIDE
  // EVERY 5 SECONDS
  // ========================================

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ======================================
          FULL WIDTH HERO
      ======================================= */}

      <div className="relative w-full h-250px sm:h-310px md:h-[470px] lg:h-[420px] xl:h-[520px]">

        {/* ======================================
            IMAGE SLIDER
        ======================================= */}

        <AnimatePresence mode="wait">
          <motion.img
            key={banners[currentSlide].id}
            src={banners[currentSlide].image}
            alt={`Fashion Hub Banner ${currentSlide + 1}`}
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -80,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              rounded-xl 
            "
          />
        </AnimatePresence>

        {/* ======================================
            PREVIOUS BUTTON
        ======================================= */}

        <button
          onClick={previousSlide}
          aria-label="Previous banner"
          className="
            absolute
            left-4
            sm:left-6
            lg:left-8
            top-1/2
            -translate-y-1/2
            z-20

            w-9
            h-9
            sm:w-11
            sm:h-11
            lg:w-12
            lg:h-12

            rounded-full

            bg-black/40
            hover:bg-yellow-500

            text-white
            hover:text-black

            backdrop-blur-sm

            flex
            items-center
            justify-center

            transition-all
            duration-300

            shadow-lg
          "
        >
          <ChevronLeft
            size={22}
            className="sm:w-6 sm:h-6"
          />
        </button>

        {/* ======================================
            NEXT BUTTON
        ======================================= */}

        <button
          onClick={nextSlide}
          aria-label="Next banner"
          className="
            absolute
            right-4
            sm:right-6
            lg:right-8
            top-1/2
            -translate-y-1/2
            z-20

            w-9
            h-9
            sm:w-11
            sm:h-11
            lg:w-12
            lg:h-12

            rounded-full

            bg-black/40
            hover:bg-yellow-500

            text-white
            hover:text-black

            backdrop-blur-sm

            flex
            items-center
            justify-center

            transition-all
            duration-300

            shadow-lg
          "
        >
          <ChevronRight
            size={22}
            className="sm:w-6 sm:h-6"
          />
        </button>

        {/* ======================================
            SLIDE INDICATORS
        ======================================= */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            z-20

            flex
            items-center
            gap-2
          "
        >
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to banner ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300

                ${
                  currentSlide === index
                    ? "w-9 bg-yellow-500"
                    : "w-2 bg-white/70 hover:bg-white"
                }
              `}
            />
          ))}
        </div>

        {/* ======================================
            COUNTER
        ======================================= */}

        <div
          className="
            absolute
            bottom-5
            right-5
            sm:right-8
            lg:right-12
            z-20

            flex
            items-center
            gap-2

            text-sm
            text-white
          "
        >
          <span className="font-semibold text-yellow-400">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <span className="text-white/60">
            /
          </span>

          <span className="text-white/60">
            {String(banners.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}