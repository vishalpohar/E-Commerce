import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/cart/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import SearchPage from "./pages/search/SearchPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import OrdersPage from "./pages/orders/OrdersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

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
    <>
      <ScrollToTop />
      <Routes>
        {/*------ AUTH ROUTES ------*/}
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-success"
            element={
              <ProtectedRoute>
                <PurchaseSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-cancel"
            element={
              <ProtectedRoute>
                <PurchaseCancelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
