import { ShoppingCart } from "lucide-react";
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
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <EmptyCartUI />
      </div>
    );
  }

  return (
    <div className="py-8 md:py-10">
      <h1 className="text-gray-700 text-2xl md:text-4xl font-bold mx-6 md:mx-28">
        Your Cart
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0">
        <div className="mt-4 sm:mt-8 md:gap-6 lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex flex-col md:flex-row gap-4 md:gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            {cart.length > 0 && (
              <div className="flex-grow space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            <div className="md:w-96 flex flex-col gap-4">
              {cart.length > 0 && (
                <>
                  <OrderSummary />
                  <GiftCouponCard />
                </>
              )}
            </div>
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 w-full flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <PeopleAlsoBought />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 w-full px-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold text-gray-600">Your cart is empty!</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-yellow-500 px-6 py-2 text-white transition-colors hover:bg-yellow-600"
      to="/">
      Start Shopping
    </Link>
  </motion.div>
);
