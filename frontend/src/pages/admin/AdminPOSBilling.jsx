
import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  CheckCircle,
  RotateCcw,
  Package,
  Wallet,
  Download,
  ArrowLeft,
} from "lucide-react";
import { jsPDF } from "jspdf";

const categories = [
  "Shirts",
  "T-shirts",
  "Hoodies",
  "Formal Shirts",
  "Pants",
  "Formal Pants",
  "Jeans",
  "Track Pants",
  "Inner Wears",
  "Banian",
  "Customs",
];

const pantsSizes = ["28", "30", "32", "34", "36", "38", "40"];

const products = [
  { id: 1, name: "Classic Casual Shirt", category: "Shirts", price: 1299, stock: 25, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 2, name: "Premium Cotton Shirt", category: "Shirts", price: 1499, stock: 30, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 3, name: "Essential Crew T-Shirt", category: "T-shirts", price: 699, stock: 40, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 4, name: "Oversized T-Shirt", category: "T-shirts", price: 899, stock: 20, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 5, name: "Classic Hoodie", category: "Hoodies", price: 1799, stock: 15, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 6, name: "Formal Office Shirt", category: "Formal Shirts", price: 1599, stock: 22, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 7, name: "Slim Fit Pants", category: "Pants", price: 1499, stock: 35, sizes: pantsSizes },
  { id: 8, name: "Classic Formal Pants", category: "Formal Pants", price: 1799, stock: 28, sizes: pantsSizes },
  { id: 9, name: "Tapered Stretch Jeans", category: "Jeans", price: 1999, stock: 33, sizes: pantsSizes },
  { id: 10, name: "Cotton Track Pants", category: "Track Pants", price: 999, stock: 30, sizes: pantsSizes },
  { id: 11, name: "Men's Innerwear", category: "Inner Wears", price: 399, stock: 50, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 12, name: "Cotton Banian", category: "Banian", price: 299, stock: 45, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 13, name: "Custom Men's Wear", category: "Customs", price: 1999, stock: 10, sizes: ["S", "M", "L", "XL", "XXL"] },
];

const currency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const AdminPOSBilling = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [message, setMessage] = useState("");
  const [generatedBill, setGeneratedBill] = useState(null);

  // Controls the receipt view in this same component.
  const [showReceipt, setShowReceipt] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];

    return products.filter(
      (product) =>
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedCategory, search]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const safeDiscount = Math.min(
    Math.max(Number(discount) || 0, 0),
    subtotal
  );

  const gstAmount = 0;
  const totalAmount = subtotal - safeDiscount;

  const addToCart = () => {
    if (!selectedProduct) {
      setMessage("Please select a product.");
      return;
    }

    if (!selectedSize) {
      setMessage("Please select a size.");
      return;
    }

    if (selectedQuantity < 1) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    if (selectedQuantity > selectedProduct.stock) {
      setMessage("Requested quantity is not available in stock.");
      return;
    }

    const existingItem = cart.find(
      (item) =>
        item.id === selectedProduct.id &&
        item.size === selectedSize
    );

    const existingQuantity = existingItem
      ? existingItem.quantity
      : 0;

    if (
      existingQuantity + selectedQuantity >
      selectedProduct.stock
    ) {
      setMessage("Total quantity exceeds available stock.");
      return;
    }

    setCart((previousCart) => {
      if (existingItem) {
        return previousCart.map((item) =>
          item.id === selectedProduct.id &&
          item.size === selectedSize
            ? {
                ...item,
                quantity: item.quantity + selectedQuantity,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...selectedProduct,
          size: selectedSize,
          quantity: selectedQuantity,
        },
      ];
    });

    setSelectedProduct(null);
    setSelectedSize("");
    setSelectedQuantity(1);
    setMessage("");
  };

  const updateQuantity = (id, size, change) => {
    const item = cart.find(
      (cartItem) =>
        cartItem.id === id && cartItem.size === size
    );

    if (!item) return;

    const nextQuantity = item.quantity + change;

    if (nextQuantity > item.stock) {
      setMessage("Available stock limit reached.");
      return;
    }

    setMessage("");

    setCart((previousCart) =>
      previousCart
        .map((cartItem) =>
          cartItem.id === id && cartItem.size === size
            ? { ...cartItem, quantity: nextQuantity }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeItem = (id, size) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };

  // GENERATE BILL
  const generateBill = () => {
    if (cart.length === 0) {
      setMessage("Please add products to the bill.");
      return;
    }

    if (!customerName.trim()) {
      setMessage("Please enter customer name.");
      return;
    }

    if (!customerPhone.trim()) {
      setMessage("Please enter customer phone number.");
      return;
    }

    const bill = {
      id: `FH-${Date.now()}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      items: cart,
      subtotal,
      discount: safeDiscount,
      gst: 0,
      total: totalAmount,
      paymentMethod,
      date: new Date().toLocaleString("en-IN"),
      status: "Completed",
    };

    try {
      const previousOrders = JSON.parse(
        localStorage.getItem("fashionHubPOSOrders") || "[]"
      );

      localStorage.setItem(
        "fashionHubPOSOrders",
        JSON.stringify([bill, ...previousOrders])
      );

      const previousCustomers = JSON.parse(
        localStorage.getItem("fashionHubPOSCustomers") || "[]"
      );

      const existingCustomer = previousCustomers.find(
        (customer) => customer.phone === customerPhone.trim()
      );

      let updatedCustomers;

      if (existingCustomer) {
        updatedCustomers = previousCustomers.map((customer) =>
          customer.phone === customerPhone.trim()
            ? {
                ...customer,
                name: customerName.trim(),
                email: customerEmail.trim(),
                orders: (customer.orders || 0) + 1,
                spent: (customer.spent || 0) + totalAmount,
              }
            : customer
        );
      } else {
        updatedCustomers = [
          {
            name: customerName.trim(),
            phone: customerPhone.trim(),
            email: customerEmail.trim(),
            orders: 1,
            spent: totalAmount,
          },
          ...previousCustomers,
        ];
      }

      localStorage.setItem(
        "fashionHubPOSCustomers",
        JSON.stringify(updatedCustomers)
      );

      // Save the latest bill for browser refresh recovery.
      localStorage.setItem(
        "fashionHubLatestBill",
        JSON.stringify(bill)
      );

      setGeneratedBill(bill);
      setShowReceipt(true);
      setMessage("Bill generated successfully!");
    } catch (error) {
      console.error("Unable to save POS bill:", error);
      setMessage("Unable to save the bill in browser storage.");
    }
  };

  // RESET BILLING
  const resetBilling = () => {
    setCart([]);
    setSelectedCategory("");
    setSearch("");
    setSelectedProduct(null);
    setSelectedSize("");
    setSelectedQuantity(1);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setDiscount(0);
    setPaymentMethod("Cash");
    setGeneratedBill(null);
    setShowReceipt(false);
    setMessage("");

    localStorage.removeItem("fashionHubLatestBill");
  };

  // PRINT RECEIPT
  const printBill = () => {
    window.print();
  };

  // DOWNLOAD RECEIPT AS PDF
  const downloadPDF = () => {
    if (!generatedBill) return;

    const bill = generatedBill;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 250],
    });

    let y = 10;

    const centerText = (text, size = 9, style = "normal") => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
      pdf.text(String(text), 40, y, { align: "center" });
      y += size * 0.45;
    };

    const leftText = (text, size = 8, style = "normal") => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
      pdf.text(String(text), 5, y);
      y += size * 0.45;
    };

    const separator = () => {
      pdf.setLineWidth(0.2);
      pdf.setDrawColor(120);
      pdf.setLineDashPattern([1, 1], 0);
      pdf.line(5, y, 75, y);
      pdf.setLineDashPattern([], 0);
      y += 5;
    };

    centerText("THE FASHION HUB", 14, "bold");
    centerText("MEN'S WEAR STORE", 9);
    centerText("SALES RECEIPT", 9, "bold");

    y += 3;
    separator();

    leftText(`Bill No: ${bill.id}`, 8);
    leftText(`Date: ${bill.date}`, 8);
    leftText(`Customer: ${bill.customerName}`, 8);
    leftText(`Phone: ${bill.customerPhone}`, 8);

    if (bill.customerEmail) {
      leftText(`Email: ${bill.customerEmail}`, 8);
    }

    y += 2;
    separator();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("ITEM", 5, y);
    pdf.text("QTY", 49, y, { align: "center" });
    pdf.text("AMOUNT", 75, y, { align: "right" });
    y += 5;

    pdf.setFont("helvetica", "normal");

    bill.items.forEach((item) => {
      const itemName = `${item.name} (Size ${item.size})`;
      const lines = pdf.splitTextToSize(itemName, 38);

      pdf.text(lines, 5, y);
      pdf.text(String(item.quantity), 49, y, {
        align: "center",
      });

      pdf.text(
        `Rs. ${(item.price * item.quantity).toFixed(2)}`,
        75,
        y,
        { align: "right" }
      );

      y += Math.max(lines.length * 4, 5);
    });

    y += 2;
    separator();

    pdf.setFontSize(8);

    const addTotalRow = (label, value, bold = false) => {
      pdf.setFont("helvetica", bold ? "bold" : "normal");
      pdf.text(label, 5, y);
      pdf.text(`Rs. ${Number(value || 0).toFixed(2)}`, 75, y, {
        align: "right",
      });
      y += 5;
    };

    addTotalRow("Subtotal", bill.subtotal);
    addTotalRow("Discount", `-${Number(bill.discount || 0).toFixed(2)}`);
    addTotalRow("GST (0%)", bill.gst);

    y += 1;
    separator();

    addTotalRow("GRAND TOTAL", bill.total, true);

    y += 2;
    leftText(`Payment Method: ${bill.paymentMethod}`, 8, "bold");

    y += 5;
    centerText("THANK YOU FOR SHOPPING!", 9, "bold");
    centerText("VISIT US AGAIN", 8);

    // Adjust the PDF height to fit the receipt content.
    pdf.internal.pageSize.setHeight(y + 10);

    pdf.save(`Fashion-Hub-${bill.id}.pdf`);
  };

  const SectionTitle = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-3 flex items-center gap-2.5 border-b border-slate-100 pb-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#142b4a] text-white">
        <Icon size={16} />
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const paymentOptions = [
    { name: "Cash", icon: Banknote, description: "Cash payment" },
    { name: "UPI", icon: Smartphone, description: "UPI payment" },
    { name: "Card", icon: CreditCard, description: "Debit / Credit card" },
  ];

  // =====================================================
  // RECEIPT VIEW - SAME FILE, NO SEPARATE COMPONENT
  // =====================================================

  if (showReceipt && generatedBill) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl space-y-4 bg-slate-50 p-3 text-slate-800 md:p-6">

        {/* RECEIPT HEADER */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#142b4a] text-white">
                <Receipt size={18} />
              </div>

              <h1 className="text-xl font-bold text-slate-900">
                Billing Receipt
              </h1>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Your bill has been generated successfully.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowReceipt(false);
              setMessage("");
            }}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft size={15} />
            Back to Billing
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 print:hidden">
          <CheckCircle size={18} />
          Bill generated successfully! Your receipt is ready.
        </div>

        {/* RECEIPT PAPER */}
        <div className="receipt-print mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          {/* STORE DETAILS */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-wide text-slate-900">
              THE FASHION HUB
            </h2>

            <p className="mt-1 text-sm font-semibold text-slate-600">
              MEN'S WEAR STORE
            </p>

            <p className="mt-1 text-xs text-slate-500">
              SALES RECEIPT
            </p>

            <div className="my-4 border-t border-dashed border-slate-400" />

            <p className="text-xs text-slate-600">
              {generatedBill.date}
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              Bill No: {generatedBill.id}
            </p>
          </div>

          {/* CUSTOMER DETAILS */}
          <div className="my-4 border-y border-dashed border-slate-400 py-3 text-sm">
            <p className="mb-2 font-bold text-slate-900">
              Customer Details
            </p>

            <div className="space-y-1 text-xs text-slate-600">
              <p>
                <strong>Name:</strong> {generatedBill.customerName}
              </p>

              <p>
                <strong>Phone:</strong> {generatedBill.customerPhone}
              </p>

              {generatedBill.customerEmail && (
                <p>
                  <strong>Email:</strong> {generatedBill.customerEmail}
                </p>
              )}
            </div>
          </div>

          {/* PRODUCT TABLE */}
          <div>
            <div className="mb-3 grid grid-cols-12 border-b border-slate-200 pb-2 text-xs font-bold text-slate-700">
              <span className="col-span-6">PRODUCT</span>
              <span className="col-span-2 text-center">QTY</span>
              <span className="col-span-4 text-right">AMOUNT</span>
            </div>

            <div className="space-y-3">
              {generatedBill.items.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${index}`}
                  className="grid grid-cols-12 text-xs"
                >
                  <div className="col-span-6 pr-1">
                    <p className="font-semibold text-slate-800">
                      {item.name}
                    </p>

                    <p className="mt-1 text-slate-500">
                      Size: {item.size}
                    </p>

                    <p className="mt-0.5 text-slate-500">
                      {currency(item.price)} each
                    </p>
                  </div>

                  <span className="col-span-2 text-center text-slate-700">
                    {item.quantity}
                  </span>

                  <span className="col-span-4 text-right font-semibold text-slate-800">
                    {currency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TOTALS */}
          <div className="my-4 border-t border-dashed border-slate-400 pt-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">
                  {currency(generatedBill.subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Discount</span>
                <span className="font-medium">
                  - {currency(generatedBill.discount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">GST (0%)</span>
                <span className="font-medium">
                  {currency(generatedBill.gst)}
                </span>
              </div>

              <div className="flex justify-between border-t border-dashed border-slate-400 pt-3 text-lg font-extrabold text-[#142b4a]">
                <span>Grand Total</span>
                <span>{currency(generatedBill.total)}</span>
              </div>

              <div className="flex justify-between pt-1 text-xs">
                <span className="text-slate-500">
                  Payment Method
                </span>

                <span className="font-bold text-slate-800">
                  {generatedBill.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">
                  Payment Status
                </span>

                <span className="font-bold text-green-600">
                  {generatedBill.status}
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-dashed border-slate-400 pt-4 text-center">
            <p className="text-sm font-extrabold text-slate-900">
              THANK YOU FOR SHOPPING!
            </p>

            <p className="mt-1 text-xs text-slate-500">
              We look forward to seeing you again.
            </p>

            <p className="mt-3 text-[10px] text-slate-400">
              THE FASHION HUB
            </p>
          </div>
        </div>

        {/* RECEIPT ACTION BUTTONS */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row print:hidden">

          <button
            type="button"
            onClick={printBill}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#142b4a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1d3c63]"
          >
            <Printer size={17} />
            Print Receipt
          </button>

          <button
            type="button"
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
          >
            <Download size={17} />
            Download PDF
          </button>

          <button
            type="button"
            onClick={resetBilling}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <Plus size={17} />
            New Bill
          </button>
        </div>

        {/* RECEIPT PRINT STYLES */}
        <style>{`
          @media print {
            @page {
              size: 80mm auto;
              margin: 3mm;
            }

            html,
            body {
              width: 80mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }

            body * {
              visibility: hidden !important;
            }

            .receipt-print,
            .receipt-print * {
              visibility: visible !important;
            }

            .receipt-print {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 74mm !important;
              max-width: 74mm !important;
              padding: 2mm !important;
              margin: 0 !important;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              color: #000 !important;
              background: #fff !important;
              font-family: Arial, sans-serif !important;
            }

            .receipt-print h2 {
              font-size: 16px !important;
            }

            .receipt-print p,
            .receipt-print span {
              color: #000 !important;
            }

            .receipt-print .text-slate-500,
            .receipt-print .text-slate-600,
            .receipt-print .text-slate-700,
            .receipt-print .text-slate-800,
            .receipt-print .text-slate-900 {
              color: #000 !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // =====================================================
  // ORIGINAL POS BILLING PAGE
  // =====================================================

  return (
    <div className="mx-auto max-w-7xl space-y-3 text-slate-800">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142b4a] text-white">
              <Receipt size={17} />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              POS Billing
            </h1>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Create and manage in-store customer purchases
          </p>
        </div>

        <button
          onClick={resetBilling}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw size={14} />
          New Bill
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
            message.includes("successfully")
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message.includes("successfully") && (
            <CheckCircle size={16} />
          )}
          {message}
        </div>
      )}

      {/* GENERATED BILL NOTICE */}
      {generatedBill && (
        <div className="flex flex-col justify-between gap-2 rounded-lg border border-green-200 bg-green-50 p-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={20} className="text-green-600" />

            <div>
              <p className="text-sm font-bold text-green-800">
                Bill generated successfully
              </p>

              <p className="text-xs text-green-700">
                Bill ID: {generatedBill.id}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowReceipt(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#142b4a] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1d3c63]"
          >
            <Receipt size={15} />
            View Receipt
          </button>
        </div>
      )}

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="min-w-0 space-y-4">

          {/* CUSTOMER DETAILS */}
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <SectionTitle
              icon={User}
              title="Customer Details"
              subtitle="Enter customer information"
            />

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Customer Name *
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#142b4a]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#142b4a]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Email Address
                </label>

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter email address (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#142b4a]"
                />
              </div>
            </div>
          </section>

          {/* PRODUCT DETAILS */}
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <SectionTitle
              icon={Package}
              title="Product Details"
              subtitle="Select products to add to the bill"
            />

            {/* CATEGORY AND SEARCH */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Product Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSearch("");
                    setSelectedProduct(null);
                    setSelectedSize("");
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#142b4a] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Search Product
                </label>

                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={!selectedCategory}
                    placeholder="Search product name..."
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#142b4a] disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT LIST */}
            {!selectedCategory ? (
              <div className="mt-3 flex min-h-24 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center">
                <Package size={24} className="mb-1.5 text-slate-300" />

                <p className="text-sm font-semibold text-slate-600">
                  No products selected
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Select a category to view available products
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="mt-3 rounded-lg bg-slate-50 py-5 text-center text-sm text-slate-500">
                No products found in this category.
              </div>
            ) : (
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {selectedCategory}
                  </p>

                  <span className="text-xs text-slate-500">
                    {filteredProducts.length} products available
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedSize("");
                        setSelectedQuantity(1);
                      }}
                      className={`rounded-lg border p-2.5 text-left transition ${
                        selectedProduct?.id === product.id
                          ? "border-[#142b4a] bg-blue-50 ring-1 ring-[#142b4a]"
                          : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-800">
                        {product.name}
                      </p>

                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#142b4a]">
                          {currency(product.price)}
                        </span>

                        <span className="text-[11px] text-slate-500">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SELECTED PRODUCT */}
            {selectedProduct && (
              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/70 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800">
                    {selectedProduct.name}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      setSelectedSize("");
                    }}
                    className="text-xs font-medium text-slate-500 hover:text-red-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Select Size
                    </label>

                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Choose size</option>

                      {selectedProduct.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.stock}
                      value={selectedQuantity}
                      onChange={(e) =>
                        setSelectedQuantity(
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addToCart}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#142b4a] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1d3c63]"
                    >
                      <Plus size={14} />
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 space-y-4">

          {/* CURRENT BILL */}
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <SectionTitle
              icon={Receipt}
              title="Current Bill"
              subtitle={`${cart.length} product types added`}
            />

            {cart.length === 0 ? (
              <div className="flex min-h-24 flex-col items-center justify-center rounded-lg bg-slate-50 text-center">
                <ShoppingCart size={24} className="mb-1.5 text-slate-300" />

                <p className="text-sm font-medium text-slate-500">
                  No products added yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add products from the left section
                </p>
              </div>
            ) : (
              <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Size: {item.size} · {currency(item.price)}
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.size, -1)
                          }
                          className="rounded border border-slate-300 p-1 hover:bg-slate-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>

                        <span className="w-5 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.size, 1)
                          }
                          className="rounded border border-slate-300 p-1 hover:bg-slate-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <p className="text-sm font-bold text-slate-900">
                        {currency(item.price * item.quantity)}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BILL CALCULATION */}
            <div className="mt-3 space-y-2 border-t border-slate-200 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">
                  {currency(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-sm text-slate-500">
                  Discount (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-28 rounded-lg border border-slate-300 px-2.5 py-1.5 text-right text-sm outline-none focus:border-[#142b4a]"
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">GST (0%)</span>
                <span className="font-medium">
                  {currency(gstAmount)}
                </span>
              </div>

              <div className="flex justify-between border-t border-dashed border-slate-300 pt-2">
                <span className="font-bold text-slate-900">
                  Total Amount
                </span>

                <span className="text-lg font-bold text-[#142b4a]">
                  {currency(totalAmount)}
                </span>
              </div>
            </div>
          </section>

          {/* PAYMENT METHOD */}
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <SectionTitle
              icon={Wallet}
              title="Payment Method"
              subtitle="Select payment option"
            />

            <div className="grid grid-cols-3 gap-2">
              {paymentOptions.map((method) => {
                const Icon = method.icon;
                const active = paymentMethod === method.name;

                return (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => setPaymentMethod(method.name)}
                    className={`relative flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-center transition ${
                      active
                        ? "border-[#142b4a] bg-blue-50 ring-1 ring-[#142b4a]"
                        : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        active
                          ? "bg-[#142b4a] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {method.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {method.description}
                      </p>
                    </div>

                    {active && (
                      <CheckCircle
                        size={14}
                        className="absolute right-1.5 top-1.5 text-[#142b4a]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* AMOUNT SUMMARY */}
            <div className="mt-3 rounded-lg bg-[#142b4a] p-3 text-white">
              <p className="text-xs text-blue-100">
                Amount to collect
              </p>

              <p className="mt-1 text-xl font-bold">
                {currency(totalAmount)}
              </p>

              <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-2 text-xs">
                <span className="text-blue-100">
                  Selected payment
                </span>

                <span className="font-semibold">
                  {paymentMethod}
                </span>
              </div>
            </div>

            {/* GENERATE BILL */}
            <button
              type="button"
              onClick={generateBill}
              disabled={cart.length === 0 || Boolean(generatedBill)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#142b4a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1d3c63] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Receipt size={16} />
              Generate Bill
            </button>
          </section>
        </div>
      </div>

      {/* ORIGINAL THERMAL RECEIPT - PRESERVED */}
      {generatedBill && (
        <div className="receipt-print mx-auto w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">
              THE FASHION HUB
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Men's Wear Store
            </p>

            <div className="my-3 border-t border-dashed border-slate-400" />

            <p className="text-sm font-bold">SALES RECEIPT</p>

            <p className="mt-1 text-xs text-slate-600">
              {generatedBill.date}
            </p>

            <p className="text-xs text-slate-600">
              Bill No: {generatedBill.id}
            </p>
          </div>

          <div className="my-3 border-t border-dashed border-slate-400" />

          <div className="space-y-1 text-xs">
            <p>Customer: {generatedBill.customerName}</p>
            <p>Phone: {generatedBill.customerPhone}</p>
          </div>

          <div className="my-3 border-t border-dashed border-slate-400" />

          <div className="space-y-3 text-xs">
            {generatedBill.items.map((item) => (
              <div key={`${item.id}-${item.size}`}>
                <p className="font-semibold">{item.name}</p>

                <div className="flex justify-between">
                  <span>
                    Size {item.size} × {item.quantity}
                  </span>

                  <span>
                    {currency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="my-3 border-t border-dashed border-slate-400" />

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency(generatedBill.subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>- {currency(generatedBill.discount)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (0%)</span>
              <span>{currency(0)}</span>
            </div>

            <div className="flex justify-between border-t border-dashed border-slate-400 pt-2 text-sm font-bold">
              <span>Grand Total</span>
              <span>{currency(generatedBill.total)}</span>
            </div>

            <div className="flex justify-between">
              <span>Payment</span>
              <span>{generatedBill.paymentMethod}</span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-slate-400" />

          <div className="text-center text-xs">
            <p className="font-semibold">
              Thank you for shopping!
            </p>

            <p className="mt-1">Visit us again.</p>
          </div>
        </div>
      )}

      {/* ORIGINAL PRINT CSS */}
      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 3mm;
          }

          body {
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          .receipt-print,
          .receipt-print * {
            visibility: visible !important;
          }

          .receipt-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 74mm !important;
            max-width: 74mm !important;
            padding: 2mm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            color: #000 !important;
            font-family: Arial, sans-serif !important;
          }

          .receipt-print h2 {
            font-size: 16px !important;
          }

          .receipt-print p,
          .receipt-print span {
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPOSBilling;
