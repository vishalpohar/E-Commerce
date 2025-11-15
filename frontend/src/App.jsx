import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";

import { useCartStore } from "./stores/useCartStore";
import OrdersPage from "./pages/OrdersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) getCartItems();
  }, [user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white" />
        </div>
      </div>
      <div className="relative flex flex-col min-h-screen z-10">
        <Navbar />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/secret-dashboard"
              element={
                user?.role === "admin" ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={user ? <OrdersPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/purchase-success"
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
