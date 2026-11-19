
import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Upload,
  Pencil,
  Trash2,
  X,
  Package,
  AlertTriangle,
} from "lucide-react";

const initialProducts = [
  { id: 1, name: "Slim fit oxford shirt", category: "Shirts", price: 1499, stock: 80 },
  { id: 2, name: "Essential crew tee", category: "T-shirts", price: 699, stock: 164 },
  { id: 3, name: "Tapered stretch jeans", category: "Jeans", price: 1999, stock: 33 },
  { id: 4, name: "Chino trousers", category: "Trousers", price: 1799, stock: 60 },
  { id: 5, name: "Bomber jacket", category: "Jackets", price: 3499, stock: 11 },
  { id: 6, name: "Cotton kurta set", category: "Ethnic wear", price: 2299, stock: 56 },
  { id: 7, name: "Leather derby shoes", category: "Footwear", price: 3999, stock: 19 },
  { id: 8, name: "Canvas belt", category: "Accessories", price: 599, stock: 150 },
];

const emptyProduct = {
  name: "",
  category: "Shirts",
  price: "",
  stock: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyProduct);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: editingId || Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId ? updatedProduct : product
        )
      );
    } else {
      setProducts((prev) => [...prev, updatedProduct]);
    }

    setShowModal(false);
    setFormData(emptyProduct);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const lines = String(event.target?.result || "")
        .split(/\r?\n/)
        .filter((line) => line.trim());

      const rows = lines.slice(1);

      const importedProducts = rows
        .map((line, index) => {
          const [name, category, price, stock] = line.split(",").map((v) =>
            v.trim().replace(/^"|"$/g, "")
          );

          if (
            !name ||
            !category ||
            !Number.isFinite(Number(price)) ||
            !Number.isFinite(Number(stock))
          ) {
            return null;
          }

          return {
            id: Date.now() + index,
            name,
            category,
            price: Number(price),
            stock: Number(stock),
          };
        })
        .filter(Boolean);

      if (importedProducts.length) {
        setProducts((prev) => [...prev, ...importedProducts]);
        alert(`${importedProducts.length} products imported successfully.`);
      } else {
        alert("No valid products found in the CSV file.");
      }

      e.target.value = "";
    };

    reader.onerror = () => {
      alert("Unable to read the selected file.");
      e.target.value = "";
    };

    reader.readAsText(file);
  };

  const activeCount = products.filter((p) => p.stock >= 10).length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your Fashion Hub product catalogue
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Upload size={16} />
            Bulk upload
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleBulkUpload}
            />
          </label>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-lg bg-[#172554] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243b75]"
          >
            <Plus size={17} />
            Add product
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total products</p>
            <Package size={19} className="text-slate-500" />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {products.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Active products</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {activeCount}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Low stock</p>
            <AlertTriangle size={19} className="text-orange-500" />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-orange-600">
            {lowStockCount}
          </h2>
        </div>
      </div>

      {/* Products table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
          <h2 className="font-semibold text-slate-800">All Products</h2>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-52"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const isLowStock = product.stock < 20;

                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Product ID: #{product.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.stock}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock === 0
                            ? "bg-red-100 text-red-700"
                            : isLowStock
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : isLowStock
                          ? "Low"
                          : "Active"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="rounded-md border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
                          title="Edit product"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-md border border-slate-200 p-2 text-red-600 hover:bg-red-50"
                          title="Delete product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Add / Edit modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  {categories.filter((c) => c !== "All").map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                    placeholder="1499"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    placeholder="50"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#172554] px-5 py-2 text-sm font-semibold text-white hover:bg-[#243b75]"
                >
                  {editingId ? "Save changes" : "Add product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
