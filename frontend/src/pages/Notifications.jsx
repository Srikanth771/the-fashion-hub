
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Bell,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
  Tag,
  Heart,
  Check,
  CheckCheck,
  Trash2,
  X,
  Clock,
  Info,
  BellOff,
  Filter,
} from "lucide-react";

const STORAGE_KEY = "fashionHubNotifications";

// Initial sample notifications
const initialNotifications = [
  {
    id: 1,
    title: "Order Confirmed!",
    message:
      "Your order #FH1025 has been successfully confirmed. We are preparing your items.",
    type: "order",
    date: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 2,
    title: "Payment Successful",
    message:
      "Your payment of ₹2,499 has been received successfully.",
    type: "payment",
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 3,
    title: "Your Order is Shipped",
    message:
      "Your order #FH1024 is on its way. Track your delivery for updates.",
    type: "shipping",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 4,
    title: "Special Offer Just for You!",
    message:
      "Get 20% OFF on your next purchase using coupon code FASHION20.",
    type: "offer",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 5,
    title: "Product Back in Stock",
    message:
      "Your favourite product is available again. Shop before it sells out!",
    type: "stock",
    date: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

// Notification styles
const notificationConfig = {
  order: {
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
    label: "Order",
  },
  payment: {
    icon: CreditCard,
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Payment",
  },
  shipping: {
    icon: Truck,
    color: "text-purple-600",
    bg: "bg-purple-50",
    label: "Shipping",
  },
  offer: {
    icon: Tag,
    color: "text-[#b59632]",
    bg: "bg-[#d6b94f]/15",
    label: "Offer",
  },
  stock: {
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-50",
    label: "Stock Alert",
  },
  system: {
    icon: Info,
    color: "text-gray-600",
    bg: "bg-gray-100",
    label: "System",
  },
};

const filters = [
  { label: "All", value: "all" },
  { label: "Orders", value: "order" },
  { label: "Payments", value: "payment" },
  { label: "Shipping", value: "shipping" },
  { label: "Offers", value: "offer" },
  { label: "Stock Alerts", value: "stock" },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Load notifications
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
          const parsed = JSON.parse(saved);

          setNotifications(
            Array.isArray(parsed) ? parsed : []
          );
        } else {
          setNotifications(initialNotifications);

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialNotifications)
          );
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
        setNotifications([]);
      }
    };

    loadNotifications();

    window.addEventListener(
      "notificationsUpdated",
      loadNotifications
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        loadNotifications
      );
    };
  }, []);

  // Save notifications
  const saveNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(
      new Event("notificationsUpdated")
    );
  };

  // Counts
  const totalCount = notifications.length;

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const readCount = totalCount - unreadCount;

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const categoryMatch =
        activeFilter === "all" ||
        item.type === activeFilter;

      const unreadMatch =
        !showUnreadOnly || !item.read;

      return categoryMatch && unreadMatch;
    });
  }, [notifications, activeFilter, showUnreadOnly]);

  // Date grouping
  const getDateGroup = (date) => {
    const notificationDate = new Date(date);
    const today = new Date();

    if (
      notificationDate.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      notificationDate.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return "Earlier";
  };

  // Time formatting
  const getTimeAgo = (date) => {
    const seconds = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
      )
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) return "Yesterday";

    if (days < 7) {
      return `${days} days ago`;
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Mark one notification as read
  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, read: true }
        : item
    );

    saveNotifications(updated);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      read: true,
    }));

    saveNotifications(updated);
  };

  // Delete one notification
  const deleteNotification = (id) => {
    const updated = notifications.filter(
      (item) => item.id !== id
    );

    saveNotifications(updated);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (!confirmed) return;

    saveNotifications([]);
  };

  // Group notifications
  const groupedNotifications = filteredNotifications.reduce(
    (groups, item) => {
      const group = getDateGroup(item.date);

      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(item);

      return groups;
    },
    {}
  );

  const groupOrder = [
    "Today",
    "Yesterday",
    "Earlier",
  ];

  // Reset filters
  const resetFilters = () => {
    setActiveFilter("all");
    setShowUnreadOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]">

      {/* ================= HEADER ================= */}

      <header className="bg-[#192b43]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

          <Link to="/" className="inline-flex">
            <span className="text-xl font-bold text-white sm:text-2xl">
              The{" "}
              <span className="text-[#d6b94f]">
                Fashion Hub
              </span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-medium text-white/80 transition hover:text-[#d6b94f] sm:text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-[1050px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* PAGE TITLE */}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#ddd7c9] pb-5">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6b94f]/15">

              <Bell
                size={22}
                className="text-[#b59632]"
              />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}

            </div>

            <div>
              <h1 className="text-xl font-bold text-[#192b43] sm:text-2xl">
                Notifications
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Stay updated with your latest alerts
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 rounded-lg border border-[#d6b94f] px-3 py-2 text-[10px] font-semibold text-[#8f7522] transition hover:bg-[#d6b94f]/10 sm:text-xs"
              >
                <CheckCheck size={15} />
                <span className="hidden sm:inline">
                  Mark all as read
                </span>
                <span className="sm:hidden">
                  Read all
                </span>
              </button>
            )}

            {totalCount > 0 && (
              <button
                type="button"
                onClick={clearAllNotifications}
                className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-[10px] font-medium text-red-500 transition hover:bg-red-50 sm:px-3 sm:text-xs"
              >
                <Trash2 size={15} />
                Clear all
              </button>
            )}

          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-xl border border-[#e5e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              Total Notifications
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#192b43]">
              {totalCount}
            </h2>
          </div>

          <div className="rounded-xl border border-[#e5e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              Unread Alerts
            </p>

            <h2 className="mt-2 text-2xl font-bold text-red-500">
              {unreadCount}
            </h2>
          </div>

          <div className="rounded-xl border border-[#e5e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              Read Notifications
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {readCount}
            </h2>
          </div>

        </div>

        {/* ================= FILTER SECTION ================= */}

        <div className="mb-6 rounded-xl border border-[#e5e0d6] bg-white p-3 shadow-sm sm:p-4">

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2">
              <Filter
                size={16}
                className="text-[#b59632]"
              />

              <h3 className="text-sm font-semibold text-[#192b43]">
                Filter Notifications
              </h3>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) =>
                  setShowUnreadOnly(e.target.checked)
                }
                className="h-4 w-4 accent-[#192b43]"
              />

              Unread only
            </label>

          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.value)
                }
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  activeFilter === filter.value
                    ? "bg-[#192b43] text-white"
                    : "bg-[#f5f3ed] text-gray-600 hover:bg-[#eae6dc]"
                }`}
              >
                {filter.label}
              </button>
            ))}

          </div>

        </div>

        {/* ================= NOTIFICATION LIST ================= */}

        <div className="space-y-7">

          {filteredNotifications.length > 0 ? (

            groupOrder.map((group) => {
              const items = groupedNotifications[group];

              if (!items || items.length === 0) {
                return null;
              }

              return (
                <section key={group}>

                  <h3 className="mb-3 text-sm font-bold text-[#192b43]">
                    {group}

                    <span className="ml-2 text-xs font-normal text-gray-400">
                      ({items.length})
                    </span>
                  </h3>

                  <div className="space-y-3">

                    {items.map((item) => {
                      const config =
                        notificationConfig[item.type] ||
                        notificationConfig.system;

                      const Icon = config.icon;

                      return (
                        <div
                          key={item.id}
                          className={`group flex w-full items-start gap-3 rounded-xl border p-3 transition-all duration-200 sm:gap-4 sm:p-4 ${
                            item.read
                              ? "border-[#e5e0d6] bg-white"
                              : "border-[#d6b94f]/50 bg-[#fffdf6] shadow-sm"
                          }`}
                        >

                          {/* NOTIFICATION ICON */}

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                          >
                            <Icon
                              size={20}
                              className={config.color}
                            />
                          </div>

                          {/* NOTIFICATION DETAILS */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="text-sm font-bold text-[#192b43]">
                                {item.title}
                              </h4>

                              {!item.read && (
                                <span className="h-2 w-2 rounded-full bg-[#d6b94f]" />
                              )}

                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                              {item.message}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3">

                              <span className="flex items-center gap-1 text-[10px] text-gray-400 sm:text-xs">
                                <Clock size={12} />
                                {getTimeAgo(item.date)}
                              </span>

                              <span className="rounded-md bg-[#f3f0e8] px-2 py-1 text-[9px] font-semibold text-[#8f7522]">
                                {config.label}
                              </span>

                            </div>

                          </div>

                          {/* NOTIFICATION ACTIONS */}

                          <div className="flex shrink-0 flex-col items-center gap-2">

                            {!item.read && (
                              <button
                                type="button"
                                title="Mark as read"
                                onClick={() =>
                                  markAsRead(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-green-600 transition hover:bg-green-50"
                              >
                                <Check size={17} />
                              </button>
                            )}

                            <button
                              type="button"
                              title="Delete notification"
                              onClick={() =>
                                deleteNotification(item.id)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                              <X size={17} />
                            </button>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </section>
              );
            })

          ) : (

            /* EMPTY NOTIFICATION STATE */

            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[#e5e0d6] bg-white px-5 py-12 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f6f0]">

                {showUnreadOnly ? (
                  <CheckCheck
                    size={35}
                    className="text-green-600"
                  />
                ) : (
                  <BellOff
                    size={35}
                    className="text-[#b59632]"
                  />
                )}

              </div>

              <h2 className="mt-5 text-lg font-bold text-[#192b43]">
                {showUnreadOnly
                  ? "No Unread Notifications"
                  : "No Notifications Found"}
              </h2>

              <p className="mt-2 max-w-[350px] text-xs leading-6 text-gray-500 sm:text-sm">
                {showUnreadOnly
                  ? "You are all caught up! There are no unread alerts."
                  : "You don't have any notifications in this category right now."}
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-[#192b43] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#243b59]"
              >
                View All Notifications
              </button>

            </div>

          )}

        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-8 border-t border-[#ddd7c9] pt-5 text-center">

          <p className="text-xs text-gray-400">
            You are all caught up with The Fashion Hub alerts.
          </p>

        </div>

      </main>
    </div>
  );
};

export default Notifications;
