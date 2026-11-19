import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Category from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import TrendingPage from "./pages/TrendingPage";
import FlashDealsPage from "./pages/FlashDealsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AllProductsPage from "./pages/AllProductsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ScrollToTop from "./components/common/ScrollToTop";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminPOSBilling from "./pages/admin/AdminPOSBilling";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* CUSTOMER WEBSITE ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/flash-deals" element={<FlashDealsPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/all-products" element={<AllProductsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPage />}
          />

          <Route path="/categories" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* ADMIN LOGIN - WITHOUT CUSTOMER LAYOUT */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN DASHBOARD - ONLY ADMIN LAYOUT */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="pos-billing" element={<AdminPOSBilling />} />
          
        </Route>

        {/* INVALID URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
