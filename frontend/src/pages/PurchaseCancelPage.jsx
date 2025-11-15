import {
  XCircle,
  ArrowLeft,
  ShoppingBag,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 py-8">
      {/* Simple fade-in using CSS only */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-20 border border-gray-100 animate-fadeIn">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-12 text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Order Cancelled</h1>
          <p className="text-orange-100 text-lg opacity-90">
            No charges have been made to your account
          </p>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          {/* Information Card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
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
          </div>

          {/* Support Card */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
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
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
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
          </div>
        </div>
      </div>

      {/* Fade In Animation (Tailwind custom) */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PurchaseCancelPage;
