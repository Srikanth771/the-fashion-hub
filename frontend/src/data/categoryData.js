import {
  Shirt,
  ShoppingBag,
  Footprints,
  Watch,
  Dumbbell,
  Briefcase,
  Crown,
  Sparkles,
  Tag,
  Flame,
  ShoppingCart,
  Package,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Fashion Wear",
    icon: Shirt,
    items: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Shorts",
      "Jackets",
      "Hoodies",
      "Ethnic Wear",
      "Formal Wear",
      "Footwear",
      "Accessories",
    ],
  },

  {
    id: 2,
    name: "Bottom Wear",
    icon: ShoppingBag,
    items: [
      "Jeans",
      "Cargo Pants",
      "Joggers",
      "Track Pants",
      "Shorts",
      "Chinos",
      "Linen Pants",
      "Formal Pants",
      "Boxers",
      "Pyjamas",
    ],
  },

  {
    id: 3,
    name: "Footwear",
    icon: Footprints,
    items: [
      "Sneakers",
      "Running Shoes",
      "Formal Shoes",
      "Boots",
      "Sandals",
      "Slippers",
      "Flip Flops",
      "Loafers",
      "Sports Shoes",
      "Canvas Shoes",
    ],
  },

  {
    id: 4,
    name: "Accessories",
    icon: Watch,
    items: [
      "Watches",
      "Wallets",
      "Belts",
      "Perfumes",
      "Sunglasses",
      "Caps",
      "Chains",
      "Bracelets",
      "Backpacks",
      "Gym Bags",
    ],
  },

  {
    id: 5,
    name: "Sports Wear",
    icon: Dumbbell,
    items: [
      "Gym T-Shirts",
      "Track Pants",
      "Compression Wear",
      "Sports Jackets",
      "Training Shorts",
      "Running Shoes",
      "Gym Accessories",
    ],
  },

  {
    id: 6,
    name: "Formal Wear",
    icon: Briefcase,
    items: [
      "Formal Shirts",
      "Formal Pants",
      "Blazers",
      "Suits",
      "Ties",
      "Waistcoats",
      "Formal Shoes",
      "Cufflinks",
    ],
  },

  {
    id: 7,
    name: "Ethnic Wear",
    icon: Crown,
    items: [
      "Kurtas",
      "Kurta Sets",
      "Sherwanis",
      "Nehru Jackets",
      "Ethnic Bottoms",
      "Mojaris",
    ],
  },

  {
    id: 8,
    name: "New Arrivals",
    icon: Sparkles,
    items: [
      "Latest T-Shirts",
      "Latest Shirts",
      "Trending Sneakers",
      "Latest Hoodies",
      "Premium Jackets",
    ],
  },

  // {
  //   id: 9,
  //   name: "Sale",
  //   icon: Tag,
  //   items: [
  //     "Under ₹499",
  //     "Under ₹999",
  //     "Flat 50% Off",
  //     "Clearance Sale",
  //     "Buy 1 Get 1",
  //   ],
  // },

  {
    id: 10,
    name: "Trending",
    icon: Flame,
    items: [
      "Oversized T-Shirts",
      "Baggy Jeans",
      "Sneakers",
      "Cargo Pants",
      "Graphic Tees",
      "Co-Ord Sets",
    ],
  },

  {
    id: 11,
    name: "Brands",
    icon: ShoppingCart,
    items: [
      "Nike",
      "Adidas",
      "Puma",
      "Levis",
      "US Polo",
      "Allen Solly",
      "Roadster",
      "H&M",
    ],
  },

  {
    id: 12,
    name: "Collections",
    icon: Package,
    items: [
      "Summer Collection",
      "Winter Collection",
      "Party Wear",
      "Office Wear",
      "Travel Wear",
      "Premium Collection",
    ],
  },
];

export default categories;