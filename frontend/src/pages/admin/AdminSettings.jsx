
import React, { useState } from "react";
import {
  Store,
  Mail,
  IndianRupee,
  ReceiptText,
  Truck,
  CreditCard,
  Save,
  Settings,
} from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: "The Fashion Hub",
    supportEmail: "support@fashionhub.com",
    currency: "INR (₹)",
    gstNumber: "",
    freeShipping: "999",
    returnWindow: "7",
    paymentGateway: "Razorpay",
    shippingPartner: "Delhivery",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("fashionHubSettings", JSON.stringify(settings));
    setSaved(true);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition";

  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-5xl space-y-5">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-[#172554]" />
          <h1 className="text-xl font-bold text-gray-900">
            Settings
          </h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage your store preferences and business information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Store Information */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Store size={18} className="text-[#172554]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Store information
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Basic details about your business
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div>
              <label className={labelClass}>Store name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Support email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className={`${inputClass} pl-9`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>GST number</label>
              <div className="relative">
                <ReceiptText size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="gstNumber"
                  value={settings.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter GSTIN"
                  maxLength={15}
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Shipping & Returns */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Truck size={18} className="text-[#172554]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Shipping & returns
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Configure delivery and return preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div>
              <label className={labelClass}>
                Free shipping above (₹)
              </label>
              <input
                type="number"
                name="freeShipping"
                min="0"
                value={settings.freeShipping}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                Orders above this amount qualify for free delivery.
              </p>
            </div>

            <div>
              <label className={labelClass}>
                Return window (days)
              </label>
              <input
                type="number"
                name="returnWindow"
                min="0"
                value={settings.returnWindow}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                Number of days customers can request a return.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Shipping partner</label>
              <select
                name="shippingPartner"
                value={settings.shippingPartner}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Delhivery">Delhivery</option>
                <option value="Shiprocket">Shiprocket</option>
              </select>
            </div>
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CreditCard size={18} className="text-[#172554]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Payment settings
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Select your preferred payment gateway
              </p>
            </div>
          </div>

          <div className="p-5">
            <label className={labelClass}>Payment gateway</label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Razorpay", "Stripe"].map((gateway) => (
                <label
                  key={gateway}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                    settings.paymentGateway === gateway
                      ? "border-[#172554] bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentGateway"
                    value={gateway}
                    checked={settings.paymentGateway === gateway}
                    onChange={handleChange}
                    className="accent-[#172554]"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {gateway}
                  </span>
                  {settings.paymentGateway === gateway && (
                    <span className="ml-auto text-xs text-blue-800 font-medium">
                      Selected
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Review your changes before saving.
          </p>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#172554] hover:bg-[#1e3a8a] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Save size={16} />
            Save changes
          </button>
        </div>

        {saved && (
          <p className="text-sm text-green-700 text-right">
            Settings saved successfully.
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminSettings;
