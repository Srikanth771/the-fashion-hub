
import React from "react";
import { Users } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Rohit Sharma",
    email: "rohit@mail.com",
    city: "Hyderabad",
    orders: 14,
    spent: 32480,
    tier: "Gold",
  },
  {
    id: 2,
    name: "Arjun Reddy",
    email: "arjun@mail.com",
    city: "Bengaluru",
    orders: 9,
    spent: 21900,
    tier: "Silver",
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram@mail.com",
    city: "Delhi",
    orders: 3,
    spent: 6120,
    tier: "New",
  },
  {
    id: 4,
    name: "Karan Mehta",
    email: "karan@mail.com",
    city: "Mumbai",
    orders: 11,
    spent: 27350,
    tier: "Gold",
  },
  {
    id: 5,
    name: "Sai Teja",
    email: "sai@mail.com",
    city: "Hyderabad",
    orders: 6,
    spent: 12400,
    tier: "Silver",
  },
];

const AdminCustomers = () => {
  const tierStyles = {
    Gold: "bg-amber-50 text-amber-700",
    Silver: "bg-slate-100 text-slate-700",
    New: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Customers
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your registered customers and their purchase details.
        </p>
      </div>

      {/* Customer table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <h2 className="font-semibold text-slate-800">
              All Customers
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {customers.length} registered customers
            </p>
          </div>

          <Users size={20} className="text-slate-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">City</th>
                <th className="px-5 py-4 text-center">Orders</th>
                <th className="px-5 py-4">Spent</th>
                <th className="px-5 py-4">Tier</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8edf8] text-xs font-bold text-[#172554]">
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {customer.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {customer.email}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {customer.city}
                  </td>

                  <td className="px-5 py-4 text-center text-sm font-medium text-slate-700">
                    {customer.orders}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    ₹{customer.spent.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${tierStyles[customer.tier]}`}
                    >
                      {customer.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
          Showing {customers.length} customers
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
