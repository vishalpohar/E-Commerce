import {
  ArrowRight,
  CheckCircle,
  Package,
  Truck,
  Mail,
  Clock,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { formatPriceInRupees } from "../utils/formatCurrency";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const response = await axios.post(
          "/payments/checkout-success",
          {
            sessionId,
          },
          { withCredentials: true }
        );
        clearCart();
        setOrderDetails(response.data);

        // Set up automatic redirect
        setTimeout(() => setIsRedirecting(true), 8000);
        setTimeout(() => {
          navigate("/");
        }, 12000);
      } catch (error) {
        console.error("Checkout success error:", error);
        setError("Failed to process order confirmation");
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart, navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            Processing your order...
          </h3>
          <p className="text-gray-600 mt-2">Please wait a moment</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Processing Error
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 50 }}
        numberOfPieces={300}
        recycle={false}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-20 border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              Order Confirmed!
            </h1>
            <p className="text-green-100 text-lg opacity-90">
              Thank you for your purchase. We're preparing your order.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Order Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-semibold text-gray-900">
                    #ECOM-
                    {orderDetails?.orderId ||
                      Math.random().toString(36).substring(2, 9).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-gray-900">
                    {formatPriceInRupees(orderDetails?.totalAmount) ||
                      "Calculating..."}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-semibold text-green-600">Paid</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Timeline
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Processing</p>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Shipped</p>
                  <p className="text-sm text-gray-600">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Delivered</p>
                  <p className="text-sm text-gray-600">3-5 business days</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
            </div>
            <p className="text-sm text-gray-700">
              We've sent an order confirmation to your email. You'll receive
              shipping updates and tracking information as your order
              progresses.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="space-y-4">
            <Link
              to="/orders"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              <Package className="w-5 h-5" />
              View Order Details
            </Link>

            <Link
              to="/"
              className="w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3">
              <ArrowRight className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Auto-redirect Notice */}
          <AnimatePresence>
            {isRedirecting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />
                  <p className="text-sm text-yellow-800">
                    Redirecting you to homepage in a few seconds...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;
