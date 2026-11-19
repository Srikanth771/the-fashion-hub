
import React from "react";
import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 18000 },
  { month: "Feb", sales: 24000 },
  { month: "Mar", sales: 21000 },
  { month: "Apr", sales: 32000 },
  { month: "May", sales: 28000 },
  { month: "Jun", sales: 42000 },
  { month: "Jul", sales: 38000 },
  { month: "Aug", sales: 51000 },
  { month: "Sep", sales: 46000 },
  { month: "Oct", sales: 62000 },
  { month: "Nov", sales: 57000 },
  { month: "Dec", sales: 75000 },
];

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,680",
    change: "+12.8%",
    positive: true,
    icon: IndianRupee,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Total Customers",
    value: "856",
    change: "+5.4%",
    positive: true,
    icon: Users,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Total Products",
    value: "342",
    change: "-2.1%",
    positive: false,
    icon: Package,
    color: "bg-purple-50 text-purple-600",
  },
];

const orders = [
  {
    id: "#FH1025",
    customer: "Rahul Sharma",
    date: "19 Nov 2026",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#FH1024",
    customer: "Arjun Reddy",
    date: "19 Nov 2026",
    amount: "₹1,899",
    status: "Processing",
  },
  {
    id: "#FH1023",
    customer: "Vikram Kumar",
    date: "18 Nov 2026",
    amount: "₹3,250",
    status: "Pending",
  },
  {
    id: "#FH1022",
    customer: "Kiran Kumar",
    date: "18 Nov 2026",
    amount: "₹999",
    status: "Delivered",
  },
];

const products = [
  {
    name: "Premium Cotton Shirt",
    category: "Men's Shirts",
    price: "₹1,299",
    sold: 125,
    stock: 45,
    initial: "S",
  },
  {
    name: "Classic Denim Jeans",
    category: "Men's Jeans",
    price: "₹1,899",
    sold: 98,
    stock: 8,
    initial: "J",
  },
  {
    name: "Casual Polo T-Shirt",
    category: "T-Shirts",
    price: "₹899",
    sold: 86,
    stock: 32,
    initial: "T",
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
};

const AdminDashboard = () => {
  return (
    <div className="space-y-5">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-[#101827]">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        <button className="w-fit rounded-lg bg-[#101827] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#26364d]">
          Download Report
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const ChangeIcon = item.positive
            ? TrendingUp
            : TrendingDown;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${item.color}`}>
                  <Icon size={19} />
                </div>

                <button className="text-gray-400 hover:text-gray-700">
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {item.title}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#101827]">
                  {item.value}
                </h2>

                <span
                  className={`flex items-center gap-1 text-[11px] font-semibold ${
                    item.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <ChangeIcon size={12} />
                  {item.change}
                </span>
              </div>

              <p className="mt-1.5 text-[10px] text-gray-400">
                Compared to previous period
              </p>
            </div>
          );
        })}
      </div>

      {/* Sales Chart and Summary */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Sales Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#101827]">
                Sales Overview
              </h2>
              <p className="mt-1 text-[11px] text-gray-500">
                Monthly sales performance
              </p>
            </div>

            <select className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs outline-none">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#D6AD60" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D6AD60" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={42}
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #eee",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Sales",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#B88A3B"
                  strokeWidth={2.5}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="rounded-xl bg-[#101827] p-5 text-white shadow-sm">
          <p className="text-xs text-gray-400">
            This Month's Revenue
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            ₹75,000
          </h2>

          <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
            <TrendingUp size={14} />
            18.5% increase
          </div>

          <div className="my-5 border-t border-white/10" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">
                Completed Orders
              </span>
              <span className="text-sm font-semibold">185</span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-400">
                Pending Orders
              </span>
              <span className="text-sm font-semibold">24</span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-400">
                Cancelled Orders
              </span>
              <span className="text-sm font-semibold">08</span>
            </div>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#D6AD60] py-2.5 text-xs font-bold text-[#101827] transition hover:bg-[#e5c17c]">
            View Analytics
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h2 className="text-sm font-bold text-[#101827]">
              Recent Orders
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Latest customer orders
            </p>
          </div>

          <button className="text-xs font-semibold text-[#B88A3B] hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs">
            <thead className="bg-gray-50 text-[10px] uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-semibold text-[#101827]">
                    {order.id}
                  </td>

                  <td className="px-4 py-3.5 text-gray-600">
                    {order.customer}
                  </td>

                  <td className="px-4 py-3.5 text-gray-500">
                    {order.date}
                  </td>

                  <td className="px-4 py-3.5 font-semibold text-[#101827]">
                    {order.amount}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h2 className="text-sm font-bold text-[#101827]">
              Top Selling Products
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Your store's best-performing products
            </p>
          </div>

          <button className="text-xs font-semibold text-[#B88A3B] hover:underline">
            View Products
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F0E6] text-sm font-bold text-[#B88A3B]">
                  {product.initial}
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[#101827]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:gap-8">
                <div>
                  <p className="text-[10px] text-gray-400">Price</p>
                  <p className="mt-1 text-xs font-semibold">
                    {product.price}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Sold</p>
                  <p className="mt-1 text-xs font-semibold">
                    {product.sold}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Stock</p>
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      product.stock < 10
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
