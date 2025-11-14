import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  if (cart.length === 0) {
    return <EmptyCartUI />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Order Summary & Coupon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-96 space-y-6">
            <OrderSummary />
            <GiftCouponCard />
          </motion.div>
        </div>

        {/* People Also Bought Section */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12">
            <PeopleAlsoBought />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="min-h-[70vh] flex items-center justify-center px-4"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
    <div className="text-center max-w-md">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart className="h-16 w-16 text-blue-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-sm">0</span>
        </div>
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
        Your cart is empty
      </h3>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Looks like you haven't added anything to your cart yet. Start exploring
        our collection and find something you love!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
          Start Shopping
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  </motion.div>
);
