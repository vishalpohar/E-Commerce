import {
  XCircle,
  ArrowLeft,
  ShoppingBag,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-20 border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-12 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>
            <h1 className="text-3xl font-bold mb-3">Order Cancelled</h1>
            <p className="text-orange-100 text-lg opacity-90">
              No charges have been made to your account
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                What Happened?
              </h2>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Your checkout process was interrupted or cancelled. This could
                be because:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>You decided not to complete the purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>There was a technical issue during payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>You wanted to review your order details</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              If you encountered any issues or have questions about your order,
              our support team is here to help.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email Support</span>
                <span className="font-medium text-blue-600">
                  support@ecommerce-store.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone Support</span>
                <span className="font-medium text-blue-600">
                  +91 1234567890
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="space-y-4">
            <Link
              to="/cart"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5" />
              Return to Cart
            </Link>

            <Link
              to="/"
              className="w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;