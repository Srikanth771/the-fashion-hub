
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const visitorData = [
  { week: "W1", visitors: 4200 },
  { week: "W2", visitors: 5800 },
  { week: "W3", visitors: 5100 },
  { week: "W4", visitors: 7200 },
  { week: "W5", visitors: 6800 },
  { week: "W6", visitors: 8500 },
  { week: "W7", visitors: 10600 },
];

const trafficData = [
  { name: "Instagram", value: 38 },
  { name: "Google search", value: 27 },
  { name: "Direct", value: 18 },
  { name: "WhatsApp", value: 11 },
  { name: "Email", value: 6 },
];

const paymentData = [
  { name: "UPI", value: 54 },
  { name: "Card", value: 26 },
  { name: "Cash on delivery", value: 16 },
  { name: "Wallet", value: 4 },
];

const funnelData = [
  { label: "Visits", value: 48200 },
  { label: "Product views", value: 21400 },
  { label: "Add to cart", value: 5900 },
  { label: "Checkout", value: 2100 },
  { label: "Purchased", value: 1284 },
];

const chartColors = ["#172554", "#2563eb", "#0d9488", "#f59e0b", "#94a3b8"];

const formatNumber = (number) => number.toLocaleString("en-IN");

const AdminAnalytics = () => {
  return (
    <div className="space-y-4 max-w-6xl">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Analytics</h1>
        <p className="text-xs text-gray-500 mt-1">
          Track visitors, traffic, conversions and payments
        </p>
      </div>

      {/* Visitors per week */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Visitors per week
        </h2>

        <div className="h-44 max-w-3xl">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="visitors" fill="#172554" radius={[3, 3, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic and Payments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">
            Traffic sources
          </h2>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={62}
                  innerRadius={35}
                  paddingAngle={2}
                >
                  {trafficData.map((item, index) => (
                    <Cell key={item.name} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">
            Payment methods
          </h2>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={62}
                  innerRadius={35}
                  paddingAngle={2}
                >
                  {paymentData.map((item, index) => (
                    <Cell key={item.name} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Conversion funnel
        </h2>

        <div className="space-y-3 max-w-3xl">
          {funnelData.map((item) => {
            const percentage = (item.value / funnelData[0].value) * 100;

            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-900">
                    {formatNumber(item.value)}
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#172554]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
