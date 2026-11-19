
import React, { useState } from "react";
import { Plus, Tag } from "lucide-react";

const initialCoupons = [
  {
    code: "WELCOME10",
    offer: "10% off first order",
    status: "Active",
    used: "412 / 1000",
    expires: "31 Dec",
  },
  {
    code: "FESTIVE500",
    offer: "₹500 off above ₹2999",
    status: "Active",
    used: "188 / 500",
    expires: "30 Nov",
  },
  {
    code: "FREESHIP",
    offer: "Free shipping above ₹999",
    status: "Active",
    used: "1,204 / ∞",
    expires: "—",
  },
  {
    code: "DIWALI20",
    offer: "20% off ethnic wear",
    status: "Expired",
    used: "640 / 640",
    expires: "12 Nov",
  },
  {
    code: "BLACKFRI",
    offer: "Flat 30% off sitewide",
    status: "Scheduled",
    used: "0 / 2000",
    expires: "29 Nov",
  },
];

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    code: "",
    offer: "",
    status: "Active",
    used: "0 / 100",
    expires: "",
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();

    const newCoupon = {
      ...form,
      code: form.code.trim().toUpperCase(),
      expires: form.expires || "—",
    };

    setCoupons((prev) => [...prev, newCoupon]);
    setForm({
      code: "",
      offer: "",
      status: "Active",
      used: "0 / 100",
      expires: "",
    });
    setShowModal(false);
  };

  const statusStyle = {
    Active: "bg-green-50 text-green-700",
    Expired: "bg-red-50 text-red-600",
    Scheduled: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Coupons</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store discount coupons
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-[#172554] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={17} />
          Create coupon
        </button>
      </div>

      {/* Coupon Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Code</th>
                <th className="px-5 py-4 font-semibold">Offer</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Used</th>
                <th className="px-5 py-4 font-semibold">Expires</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {coupons.map((coupon, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <span className="font-bold text-gray-900">
                      {coupon.code}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {coupon.offer}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        statusStyle[coupon.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {coupon.used}
                  </td>

                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {coupon.expires}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
          Showing {coupons.length} coupons
        </div>
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Create Coupon
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  required
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value })
                  }
                  placeholder="Example: NEWYEAR20"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer
                </label>
                <input
                  required
                  value={form.offer}
                  onChange={(e) =>
                    setForm({ ...form, offer: e.target.value })
                  }
                  placeholder="Example: 20% off sitewide"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                >
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Expired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usage Limit
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.used.split(" / ")[1]}
                  onChange={(e) =>
                    setForm({ ...form, used: `0 / ${e.target.value}` })
                  }
                  placeholder="100"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={form.expires}
                  onChange={(e) =>
                    setForm({ ...form, expires: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#172554] text-white text-sm font-medium hover:bg-[#1e3a8a]"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
