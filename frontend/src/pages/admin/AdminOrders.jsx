
import React, { useMemo, useState } from "react";
import {
  Search,
  Download,
  Eye,
  X,
  ChevronDown,
  ShoppingBag,
  IndianRupee,
  Clock,
  Truck,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

const initialOrders = [
  {
    id: "#FH-10482",
    customer: "Rohit Sharma",
    email: "rohit.sharma@gmail.com",
    phone: "9876543210",
    items: "Slim fit oxford shirt ×2",
    total: 2998,
    status: "Delivered",
    payment: "UPI",
    date: "18 Nov 2026",
  },
  {
    id: "#FH-10481",
    customer: "Arjun Reddy",
    email: "arjun.reddy@gmail.com",
    phone: "9876543211",
    items: "Bomber jacket",
    total: 3499,
    status: "Shipped",
    payment: "Card",
    date: "18 Nov 2026",
  },
  {
    id: "#FH-10480",
    customer: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "9876543212",
    items: "Chino trousers, Canvas belt",
    total: 2398,
    status: "Pending",
    payment: "COD",
    date: "18 Nov 2026",
  },
  {
    id: "#FH-10479",
    customer: "Karan Mehta",
    email: "karan.mehta@gmail.com",
    phone: "9876543213",
    items: "Cotton kurta set",
    total: 2299,
    status: "Delivered",
    payment: "UPI",
    date: "17 Nov 2026",
  },
  {
    id: "#FH-10478",
    customer: "Imran Khan",
    email: "imran.khan@gmail.com",
    phone: "9876543214",
    items: "Leather derby shoes",
    total: 3999,
    status: "Cancelled",
    payment: "Card",
    date: "17 Nov 2026",
  },
  {
    id: "#FH-10477",
    customer: "Sai Teja",
    email: "saiteja@gmail.com",
    phone: "9876543215",
    items: "Essential crew tee ×3",
    total: 2097,
    status: "Shipped",
    payment: "UPI",
    date: "16 Nov 2026",
  },
  {
    id: "#FH-10476",
    customer: "Nikhil Rao",
    email: "nikhil.rao@gmail.com",
    phone: "9876543216",
    items: "Tapered stretch jeans",
    total: 1999,
    status: "Refunded",
    payment: "Card",
    date: "16 Nov 2026",
  },
  {
    id: "#FH-10475",
    customer: "Aditya Verma",
    email: "aditya.verma@gmail.com",
    phone: "9876543217",
    items: "Chino trousers",
    total: 1799,
    status: "Pending",
    payment: "COD",
    date: "15 Nov 2026",
  },
];

const filters = [
  "All",
  "Pending",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Refunded: "bg-purple-100 text-purple-700",
};

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" || order.status === activeFilter;

      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, search]);

  const getCount = (status) => {
    if (status === "All") return orders.length;

    return orders.filter((order) => order.status === status).length;
  };

  // Update order status
  const updateStatus = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((previous) =>
      previous?.id === orderId
        ? { ...previous, status: newStatus }
        : previous
    );
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Phone",
      "Items",
      "Total",
      "Status",
      "Payment",
      "Date",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.email,
      order.phone,
      order.items,
      order.total,
      order.status,
      order.payment,
      order.date,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "fashion-hub-orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-[#141e32]">
            Orders
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Manage and track all customer orders.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#141e32] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#26364d]"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Total Orders</p>
            <ShoppingBag size={18} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-[#141e32]">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Pending</p>
            <Clock size={18} className="text-amber-600" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-[#141e32]">
            {getCount("Pending")}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Shipped</p>
            <Truck size={18} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-[#141e32]">
            {getCount("Shipped")}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Delivered</p>
            <CheckCircle size={18} className="text-green-600" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-[#141e32]">
            {getCount("Delivered")}
          </h2>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {/* Search */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#141e32]">
              All Orders
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="relative w-full lg:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-[#b88a3b]"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto border-b border-gray-100 px-4 py-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                activeFilter === filter
                  ? "bg-[#141e32] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  activeFilter === filter
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {getCount(filter)}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">

            <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Items</th>
                <th className="px-4 py-3.5">Total</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Payment</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#141e32]">
                      {order.id}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-semibold text-gray-800">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">
                        {order.phone}
                      </p>
                    </td>

                    <td className="max-w-[180px] px-4 py-4 text-gray-600">
                      {order.items}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#141e32]">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {order.payment}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                      {order.date.replace(" 2026", "")}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#f5f0e6] hover:text-[#b88a3b]"
                        title="View order"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col justify-between gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center">
          <p className="text-[11px] text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <p className="text-[11px] text-gray-400">
            Fashion Hub Order Management
          </p>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-base font-bold text-[#141e32]">
                  Order Details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 p-5">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Customer</p>
                <p className="mt-1 text-sm font-semibold text-[#141e32]">
                  {selectedOrder.customer}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedOrder.email}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedOrder.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedOrder.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedOrder.payment}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">
                  ORDER ITEM
                </p>
                <div className="flex justify-between rounded-lg border border-gray-100 p-3">
                  <span className="text-sm text-gray-700">
                    {selectedOrder.items}
                  </span>
                  <span className="text-sm font-bold text-[#141e32]">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm font-semibold text-gray-600">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-[#141e32]">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>

              {/* Update Status */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-600">
                  Update Order Status
                </label>

                <div className="relative">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      updateStatus(selectedOrder.id, e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#b88a3b]"
                  >
                    {filters.slice(1).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-100 p-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg bg-[#141e32] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#26364d]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
