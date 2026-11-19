
import React, { useState } from "react";
import {
  Bell,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  CheckCheck,
  Check,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New order received",
    message: "Order #FH-10482 has been placed by Rohit Sharma.",
    time: "5 minutes ago",
    type: "order",
    unread: true,
  },
  {
    id: 2,
    title: "Low stock alert",
    message: "Bomber jacket has only 11 units remaining in stock.",
    time: "20 minutes ago",
    type: "inventory",
    unread: true,
  },
  {
    id: 3,
    title: "New customer registered",
    message: "Arjun Reddy has created a new customer account.",
    time: "1 hour ago",
    type: "customer",
    unread: true,
  },
  {
    id: 4,
    title: "Payment successful",
    message: "Payment of ₹2,998 received for order #FH-10482.",
    time: "2 hours ago",
    type: "payment",
    unread: false,
  },
  {
    id: 5,
    title: "Order shipped",
    message: "Order #FH-10481 has been shipped successfully.",
    time: "4 hours ago",
    type: "order",
    unread: false,
  },
  {
    id: 6,
    title: "Out of stock",
    message: "Tapered stretch jeans are currently out of stock.",
    time: "Yesterday",
    type: "inventory",
    unread: false,
  },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter((item) => item.unread).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "Unread") return item.unread;
    return true;
  });

  const iconStyle = {
    order: {
      icon: ShoppingBag,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    inventory: {
      icon: Package,
      bg: "bg-amber-50",
      color: "text-amber-700",
    },
    customer: {
      icon: Users,
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
    payment: {
      icon: CreditCard,
      bg: "bg-green-50",
      color: "text-green-700",
    },
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  return (
    <div className="max-w-5xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={19} className="text-[#172554]" />
            <h1 className="text-xl font-bold text-gray-900">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-red-50 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Stay updated with your store activities
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 text-xs font-medium text-[#172554] hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-5 px-4 py-3 border-b border-gray-100">
          {["All", "Unread"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`text-sm font-medium pb-1 border-b-2 transition ${
                filter === item
                  ? "text-[#172554] border-[#172554]"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              {item}
              {item === "Unread" && (
                <span className="ml-1.5 text-xs text-gray-400">
                  ({unreadCount})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              const Icon = iconStyle[item.type].icon;

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-4 py-4 transition hover:bg-gray-50 ${
                    item.unread ? "bg-blue-50/30" : "bg-white"
                  }`}
                >
                  <div
                    className={`shrink-0 p-2 rounded-lg ${iconStyle[item.type].bg}`}
                  >
                    <Icon
                      size={17}
                      className={iconStyle[item.type].color}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-400">
                        {item.time}
                      </span>

                      {item.unread && (
                        <button
                          onClick={() => markAsRead(item.id)}
                          className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-medium"
                        >
                          <Check size={13} />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <Bell size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                No unread notifications
              </p>
              <p className="text-xs text-gray-400 mt-1">
                You're all caught up!
              </p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          Showing {filteredNotifications.length} notifications
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
