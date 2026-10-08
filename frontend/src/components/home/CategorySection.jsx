"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import {
  Shirt,
  ShoppingBag,
  Footprints,
  Watch,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "T-Shirts",
    icon: Shirt,
  },
  {
    id: 2,
    name: "Shirts",
    icon: Shirt,
  },
  {
    id: 3,
    name: "Jeans",
    icon: ShoppingBag,
  },
  {
    id: 4,
    name: "Jackets",
    icon: Shirt,
  },
  {
    id: 5,
    name: "Hoodies",
    icon: Shirt,
  },
  {
    id: 6,
    name: "Ethnic Wear",
    icon: Shirt,
  },
  {
    id: 7,
    name: "Footwear",
    icon: Footprints,
  },
  {
    id: 8,
    name: "Accessories",
    icon: Watch,
  },
];

const iconColors = [
  "text-blue-500 bg-blue-50",
  "text-purple-500 bg-purple-50",
  "text-orange-500 bg-orange-50",
  "text-green-500 bg-green-50",
  "text-red-500 bg-red-50",
  "text-indigo-500 bg-indigo-50",
  "text-yellow-600 bg-yellow-50",
  "text-pink-500 bg-pink-50",
  "text-cyan-500 bg-cyan-50",
  "text-emerald-500 bg-emerald-50",
  "text-violet-500 bg-violet-50",
  "text-rose-500 bg-rose-50",
];

const CategorySection = () => {
  return (
    <section className="w-full bg-white border-b border-gray-100">
      <div className="w-full px-0 py-2">

        {/* Category Container */}
        <div
          className="
            flex
            items-start
            justify-center
            gap-10
            md:gap-11
            lg:gap-13
            overflow-x-auto
            scrollbar-hide
            py-6
            bg-amber-100
          "
        >

          {/* Categories */}
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="
                  group
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-w-[75px]
                  sm:min-w-[85px]
                  flex-shrink-0
                  focus:outline-none
                  cursor-pointer
                  no-underline
                "
              >

                {/* Icon */}
                <div
                  className={`
                    w-[52px]
                    h-[52px]
                    sm:w-[58px]
                    sm:h-[58px]
                    rounded-[16px]
                    flex
                    items-center
                    justify-center
                    border
                    border-amber-200
                    transition-all
                    duration-300
                    ${iconColors[index % iconColors.length]}
                    group-hover:-translate-y-1
                    group-hover:shadow-md
                  `}
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Category Name */}
                <span
                  className="
                    mt-2
                    text-[11px]
                    sm:text-[12px]
                    font-medium
                    text-gray-800
                    text-center
                    leading-tight
                    max-w-[85px]
                    truncate
                  "
                >
                  {category.name}
                </span>

              </Link>
            );
          })}

          {/* All Categories */}
          <Link
            to="/products"
            className="
              group
              flex
              flex-col
              items-center
              justify-center
              min-w-[75px]
              sm:min-w-[85px]
              flex-shrink-0
              focus:outline-none
              cursor-pointer
              no-underline
            "
          >

            {/* Arrow Icon */}
            <div
              className="
                w-[52px]
                h-[52px]
                sm:w-[58px]
                sm:h-[58px]
                rounded-[16px]
                border
                border-dashed
                border-gray-400
                bg-gray-50
                flex
                items-center
                justify-center
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:bg-gray-100
                group-hover:shadow-md
              "
            >
              <ChevronRight
                size={24}
                strokeWidth={1.7}
                className="
                  text-gray-700
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </div>

            {/* All Categories Text */}
            <span
              className="
                mt-2
                text-[11px]
                sm:text-[12px]
                font-medium
                text-gray-800
                text-center
                whitespace-nowrap
              "
            >
              All Categories
            </span>

          </Link>

        </div>
      </div>
    </section>
  );
};

export default CategorySection;