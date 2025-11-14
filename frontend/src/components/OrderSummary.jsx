import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { ArrowRight, Shield, Truck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { formatPriceInRupees } from "../utils/formatCurrency";

const stripePromise = loadStripe(
  "pk_test_51SFAjxKkfSkHjMbFaeOfZNaqmCFCr8MSkiVek6iKWjTBGQS2R3T74IDiappe8KhaqjI6eovUiCrAVBKPpnM8xBKZ00KNp6Vgue"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = formatPriceInRupees(subtotal);
  const formattedTotal = formatPriceInRupees(total);
  const formattedSavings = formatPriceInRupees(savings);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      {/* Pricing Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">{formattedSubtotal}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600">Savings</span>
            <span className="text-green-600 font-medium">
              -{formattedSavings}
            </span>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex justify-between items-center">
            <span className="text-blue-600">Coupon ({coupon.code})</span>
            <span className="text-blue-600 font-medium">
              -{coupon.discountPercentage}%
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formattedTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Truck className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Free Shipping</p>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Secure Checkout</p>
        </div>
        <div className="text-center">
          <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">24/7 Support</p>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}>
        Proceed to Checkout
      </motion.button>

      {/* Continue Shopping */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Continue Shopping
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;