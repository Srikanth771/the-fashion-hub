export const allProducts = [
  // 1. SHIRTS
  {
    id: "1",
    brand: "CORSO",
    name: "Premium Egyptian White Cotton Formal Shirt",
    category: "Shirts",
    subCategory: "Formal Shirts",
    price: "₹1,799",
    priceNumber: 1799,
    oldPrice: "₹2,999",
    discount: "40% OFF",
    rating: 4.8,
    reviews: 231,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isNew: true,
    isFlashDeal: false,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Elevate your formal and smart-casual wardrobe with the Corso Premium White Cotton Shirt. Crafted from 100% long-staple Egyptian cotton for unmatched comfort.",
    features: ["100% Egyptian Cotton", "Slim Fit Spread Collar", "Wrinkle Resistant Finish"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#FFFFFF", border: true }, { name: "Sky Blue", hex: "#87CEEB" }]
  },
  {
    id: "2",
    brand: "URBAN EDGE",
    name: "Relaxed Fit Sage Green Linen Casual Shirt",
    category: "Shirts",
    subCategory: "Casual Shirts",
    price: "₹1,499",
    priceNumber: 1499,
    oldPrice: "₹2,299",
    discount: "35% OFF",
    rating: 4.6,
    reviews: 121,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Lightweight and breathable, this linen blend shirt is designed for summer days and casual resort outings.",
    features: ["55% Linen, 45% Cotton", "Breathable Texture", "Relaxed Fit"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Sage Green", hex: "#778B71" }, { name: "Sand Beige", hex: "#E3DAC9" }]
  },
  {
    id: "3",
    brand: "CORSO",
    name: "Classic Oxford Blue Button-Down Shirt",
    category: "Shirts",
    subCategory: "Formal Shirts",
    price: "₹1,999",
    priceNumber: 1999,
    oldPrice: "₹2,999",
    discount: "33% OFF",
    rating: 4.9,
    reviews: 428,
    inStock: true,
    minOrder: 1,
    isTrending: false,
    isFlashDeal: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Best-selling formal Oxford weave shirt made with durable high-thread cotton yarns for sharp appearance all day long.",
    features: ["100% Oxford Cotton", "Button-Down Collar", "Chest Pocket"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },

  // 2. T-SHIRTS
  {
    id: "4",
    brand: "URBAN EDGE",
    name: "Heavyweight 240 GSM Obsidian Black T-Shirt",
    category: "T-Shirts",
    subCategory: "Boxy T-Shirts",
    price: "₹899",
    priceNumber: 899,
    oldPrice: "₹1,499",
    discount: "40% OFF",
    rating: 4.7,
    reviews: 318,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Heavyweight combed cotton crewneck t-shirt engineered for optimal drape, shape retention, and supreme streetwear comfort.",
    features: ["240 GSM Organic Cotton", "Drop Shoulder Fit", "Reinforced Collar"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "5",
    brand: "URBAN EDGE",
    name: "Essential Cotton Piqué Black Polo T-Shirt",
    category: "T-Shirts",
    subCategory: "Polo T-Shirts",
    price: "₹999",
    priceNumber: 999,
    oldPrice: "₹1,599",
    discount: "38% OFF",
    rating: 4.8,
    reviews: 512,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=85"
    ],
    description: "High performance cotton piqué polo shirt featuring ribbed knit collar and classic 2-button placket.",
    features: ["100% Cotton Piqué", "Color-Fast Dye", "Ribbed Collar"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },

  // 3. JEANS & TROUSERS
  {
    id: "6",
    brand: "MONARCH",
    name: "Slim Fit Stretch Indigo Denim Jeans",
    category: "Jeans & Trousers",
    subCategory: "Jeans",
    price: "₹2,299",
    priceNumber: 2299,
    oldPrice: "₹3,499",
    discount: "34% OFF",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Crafted with premium indigo stretch denim, offering high flexibility without losing shape over daily wear.",
    features: ["12oz Premium Stretch Denim", "5-Pocket Styling", "Slim Tapered Cut"],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    id: "7",
    brand: "MONARCH",
    name: "Classic Heavyweight Straight Fit Blue Jeans",
    category: "Jeans & Trousers",
    subCategory: "Jeans",
    price: "₹2,199",
    priceNumber: 2199,
    oldPrice: "₹3,499",
    discount: "37% OFF",
    rating: 4.8,
    reviews: 386,
    inStock: true,
    minOrder: 1,
    isTrending: false,
    isFlashDeal: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Classic straight fit denim offering relaxed room through thigh and knee with sturdy indigo cotton durability.",
    features: ["100% Rigid Heavy Duty Cotton", "Straight Leg Cut", "Zip Fly"],
    sizes: ["30", "32", "34", "36", "38"]
  },

  // 4. HOODIES & SWEATSHIRTS
  {
    id: "8",
    brand: "NORTHLINE",
    name: "Oversized Heavy Fleece Concrete Grey Hoodie",
    category: "Hoodies & Sweatshirts",
    subCategory: "Hoodies",
    price: "₹1,999",
    priceNumber: 1999,
    oldPrice: "₹2,999",
    discount: "33% OFF",
    rating: 4.8,
    reviews: 276,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"
    ],
    description: "350 GSM heavyweight brushed fleece hoodie featuring double-layered hood and deep kangaroo pouch pockets.",
    features: ["350 GSM Fleece", "Double Lined Hood", "Spacious Kangaroo Pocket"],
    sizes: ["S", "M", "L", "XL"]
  },

  // 5. JACKETS & OUTERWEAR
  {
    id: "9",
    brand: "CORSO",
    name: "Olive Urban Weatherproof Bomber Jacket",
    category: "Jackets & Outerwear",
    subCategory: "Bomber Jackets",
    price: "₹2,899",
    priceNumber: 2899,
    oldPrice: "₹4,499",
    discount: "35% OFF",
    rating: 4.9,
    reviews: 198,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Reimagined for the modern street aesthetic. Water-repellent outer shell with thermal quilting lining keeps you warm.",
    features: ["Matte Water-Repellent Shell", "Quilted Lining", "YKK Zippers"],
    sizes: ["M", "L", "XL"]
  },
  {
    id: "10",
    brand: "MONARCH",
    name: "Vintage Wash Stonewashed Trucker Denim Jacket",
    category: "Jackets & Outerwear",
    subCategory: "Denim Jackets",
    price: "₹2,799",
    priceNumber: 2799,
    oldPrice: "₹4,299",
    discount: "35% OFF",
    rating: 4.8,
    reviews: 164,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85"
    ],
    description: "A timeless outerwear staple featuring vintage stonewash detailing, heavy contrast stitching, and chest flap pockets.",
    features: ["100% Rigid Heavy Cotton Denim", "Adjustable Waist Tabs", "Chest Flap Pockets"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },

  // 6. ETHNIC WEAR
  {
    id: "11",
    brand: "RIVAAYAT",
    name: "Classic Festive Royal Navy Slub Cotton Kurta",
    category: "Ethnic Wear",
    subCategory: "Kurtas",
    price: "₹1,599",
    priceNumber: 1599,
    oldPrice: "₹2,499",
    discount: "36% OFF",
    rating: 4.7,
    reviews: 142,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Tailored from breathable slub cotton yarn with delicate mandarin collar detail and subtle embroidery work.",
    features: ["100% Slub Cotton", "Mandarin Collar", "Side Seam Pockets"],
    sizes: ["M", "L", "XL", "XXL"]
  },

  // 7. FOOTWEAR
  {
    id: "12",
    brand: "URBAN SNEAKERS",
    name: "Retro White Leather Low-Top Street Sneakers",
    category: "Footwear",
    subCategory: "Sneakers",
    price: "₹3,499",
    priceNumber: 3499,
    oldPrice: "₹4,999",
    discount: "30% OFF",
    rating: 4.9,
    reviews: 215,
    inStock: true,
    minOrder: 1,
    isTrending: true,
    isFlashDeal: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Handcrafted synthetic leather sneakers with cushioned footbed and durable non-slip rubber cupsole.",
    features: ["Cushioned Insole", "Vulc Rubber Sole", "Padded Ankle Collar"],
    sizes: ["7", "8", "9", "10", "11"]
  },

  // 8. ACCESSORIES
  {
    id: "13",
    brand: "CORSO ACCESSORIES",
    name: "Full-Grain Genuine Leather Formal Belt & Wallet Combo",
    category: "Accessories",
    subCategory: "Leather Goods",
    price: "₹1,299",
    priceNumber: 1299,
    oldPrice: "₹1,999",
    discount: "35% OFF",
    rating: 4.8,
    reviews: 180,
    inStock: true,
    minOrder: 1,
    isTrending: false,
    isFlashDeal: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85"
    ],
    description: "100% genuine full-grain leather belt paired with an RFID-protected slim bifold leather wallet in a gift box.",
    features: ["Genuine Leather", "RFID Protection", "Reversible Metal Buckle"]
  }
];

export const getProductById = (id) => {
  const found = allProducts.find((p) => String(p.id) === String(id));
  if (found) return found;

  return {
    id: String(id),
    brand: "THE FASHION HUB",
    name: `Men's Fashion Item #${id}`,
    category: "Shirts",
    price: "₹1,999",
    priceNumber: 1999,
    oldPrice: "₹2,999",
    discount: "33% OFF",
    rating: 4.8,
    reviews: 150,
    inStock: true,
    minOrder: 1,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Premium quality men's fashion wear crafted with care and high quality materials.",
    features: ["100% Premium Cotton Blend", "Modern Tailored Fit", "100% Genuine Guarantee"]
  };
};
