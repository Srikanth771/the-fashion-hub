
import React, { useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Boxes,
  X,
  Pencil,
  Plus,
  Minus,
} from "lucide-react";

const initialInventory = [
  {
    id: 1,
    name: "Slim fit oxford shirt",
    category: "Shirts",
    price: 1499,
    sizes: { S: 24, M: 30, L: 18, XL: 6, XXL: 2 },
  },
  {
    id: 2,
    name: "Essential crew tee",
    category: "T-shirts",
    price: 699,
    sizes: { S: 40, M: 52, L: 38, XL: 22, XXL: 12 },
  },
  {
    id: 3,
    name: "Tapered stretch jeans",
    category: "Jeans",
    price: 1999,
    sizes: { S: 10, M: 14, L: 9, XL: 0, XXL: 0 },
  },
  {
    id: 4,
    name: "Chino trousers",
    category: "Trousers",
    price: 1799,
    sizes: { S: 12, M: 20, L: 16, XL: 8, XXL: 4 },
  },
  {
    id: 5,
    name: "Bomber jacket",
    category: "Jackets",
    price: 3499,
    sizes: { S: 3, M: 2, L: 5, XL: 1, XXL: 0 },
  },
  {
    id: 6,
    name: "Cotton kurta set",
    category: "Ethnic wear",
    price: 2299,
    sizes: { S: 14, M: 18, L: 12, XL: 7, XXL: 5 },
  },
  {
    id: 7,
    name: "Leather derby shoes",
    category: "Footwear",
    price: 3999,
    sizes: { S: 0, M: 6, L: 8, XL: 5, XXL: 0 },
  },
  {
    id: 8,
    name: "Canvas belt",
    category: "Accessories",
    price: 599,
    sizes: { S: 30, M: 30, L: 30, XL: 30, XXL: 30 },
  },
];

const SIZE_NAMES = ["S", "M", "L", "XL", "XXL"];

const getTotal = (sizes) =>
  Object.values(sizes).reduce((sum, value) => sum + value, 0);

const getStatus = (total) => {
  if (total === 0) return "Out of stock";
  if (total <= 20) return "Low stock";
  return "Active";
};

const statusStyles = {
  Active: "bg-green-50 text-green-700 ring-green-200",
  "Low stock": "bg-orange-50 text-orange-700 ring-orange-200",
  "Out of stock": "bg-red-50 text-red-700 ring-red-200",
};

const AdminInventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedSizes, setUpdatedSizes] = useState({});

  const categories = [
    "All",
    "Shirts",
    "T-shirts",
    "Jeans",
    "Trousers",
    "Jackets",
    "Ethnic wear",
    "Footwear",
    "Accessories",
  ];

  const totalUnits = inventory.reduce(
    (sum, product) => sum + getTotal(product.sizes),
    0
  );

  const lowStockItems = inventory.filter((product) => {
    const total = getTotal(product.sizes);
    return total > 0 && total <= 20;
  }).length;

  const outOfStockItems = inventory.filter(
    (product) => getTotal(product.sizes) === 0
  ).length;

  const stockValue = inventory.reduce(
    (sum, product) => sum + product.price * getTotal(product.sizes),
    0
  );

  const filteredInventory = useMemo(() => {
    return inventory.filter((product) => {
      const total = getTotal(product.sizes);
      const status = getStatus(total);

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventory, search, category, statusFilter]);

  const openStockEditor = (product) => {
    setSelectedProduct(product);
    setUpdatedSizes({ ...product.sizes });
  };

  const changeSizeStock = (size, value) => {
    setUpdatedSizes((prev) => ({
      ...prev,
      [size]: Math.max(0, Number(value) || 0),
    }));
  };

  const saveStock = () => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, sizes: { ...updatedSizes } }
          : product
      )
    );

    setSelectedProduct(null);
  };

  const summaryCards = [
    {
      title: "Total units",
      value: totalUnits.toLocaleString("en-IN"),
      note: "3.1% vs last month",
      positive: true,
      icon: Boxes,
      iconStyle: "bg-blue-50 text-blue-700",
    },
    {
      title: "Low stock items",
      value: lowStockItems,
      note: "2 fewer vs last month",
      positive: true,
      icon: AlertTriangle,
      iconStyle: "bg-orange-50 text-orange-600",
    },
    {
      title: "Out of stock",
      value: outOfStockItems,
      note: "1 fewer vs last month",
      positive: true,
      icon: Package,
      iconStyle: "bg-red-50 text-red-600",
    },
    {
      title: "Stock value",
      value: `₹${(stockValue / 100000).toFixed(2)}L`,
      note: "4.8% vs last month",
      positive: true,
      icon: TrendingUp,
      iconStyle: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Inventory</h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor stock levels and manage product sizes
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Package size={17} />
          {inventory.length} products tracked
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <div className={`rounded-lg p-2 ${card.iconStyle}`}>
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-800">
                {card.value}
              </h2>

              <div className="mt-2 flex items-center gap-1 text-xs">
                {card.positive ? (
                  <TrendingUp size={14} className="text-green-600" />
                ) : (
                  <TrendingDown size={14} className="text-red-600" />
                )}
                <span className="text-slate-500">{card.note}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inventory table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-semibold text-slate-800">Stock by size</h2>
              <p className="mt-1 text-xs text-slate-500">
                View and update available units for each product size
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-48"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All categories" : item}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Low stock">Low stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                {SIZE_NAMES.map((size) => (
                  <th key={size} className="px-3 py-3 text-center">
                    {size}
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((product) => {
                const total = getTotal(product.sizes);
                const status = getStatus(total);

                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {product.category}
                    </td>

                    {SIZE_NAMES.map((size) => (
                      <td key={size} className="px-3 py-4 text-center">
                        <span
                          className={`inline-flex min-w-9 justify-center rounded-md px-2 py-1 text-sm font-semibold ${
                            product.sizes[size] === 0
                              ? "bg-red-50 text-red-600"
                              : product.sizes[size] <= 5
                              ? "bg-orange-50 text-orange-700"
                              : "text-slate-700"
                          }`}
                        >
                          {product.sizes[size]}
                        </span>
                      </td>
                    ))}

                    <td className="px-4 py-4 text-center text-sm font-bold text-slate-800">
                      {total}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => openStockEditor(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil size={14} />
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredInventory.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 sm:flex-row">
          <span>
            Showing {filteredInventory.length} of {inventory.length} products
          </span>
          <span>Stock is calculated across all available sizes</span>
        </div>
      </div>

      {/* Stock update modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-bold text-slate-800">Update stock</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedProduct.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm font-medium text-slate-700">
                Available units by size
              </p>

              {SIZE_NAMES.map((size) => (
                <div
                  key={size}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="w-12 text-sm font-semibold text-slate-700">
                    {size}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        changeSizeStock(size, updatedSizes[size] - 1)
                      }
                      className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                    >
                      <Minus size={14} />
                    </button>

                    <input
                      type="number"
                      min="0"
                      value={updatedSizes[size]}
                      onChange={(e) =>
                        changeSizeStock(size, e.target.value)
                      }
                      className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold outline-none focus:border-blue-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        changeSizeStock(size, updatedSizes[size] + 1)
                      }
                      className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm font-medium text-slate-600">
                  Updated total stock
                </span>
                <span className="text-lg font-bold text-slate-800">
                  {getTotal(updatedSizes)}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={saveStock}
                  className="rounded-lg bg-[#172554] px-5 py-2 text-sm font-semibold text-white hover:bg-[#243b75]"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
