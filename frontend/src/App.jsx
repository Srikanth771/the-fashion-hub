import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>

        <ScrollToTop />

      <Routes>
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
          <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;