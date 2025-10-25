import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const { orders, totalPages, getMyOrders, loading } = useProductStore();

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const isPreviousDisabled = orders.length === 0 || page === 1;
  const isNextDisabled =
    orders.length === 0 || (totalPages != null ? page === totalPages : true);

  const formatedDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    getMyOrders(page);
  }, [page]);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <EmptyOrdersUI />
      </div>
    );
  }

  return (
    <div className="py-8 md:py-10 text-gray-700">
      <h1 className="text-gray-700 mx-6 md:mx-20 text-3xl sm:text-4xl font-bold">
        Orders
      </h1>
      {Array.isArray(orders) && orders.length > 0 && (
        <div className="container mx-auto px-4 md:px-20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {orders.map((order) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-3/4 shadow-lg bg-white p-4 rounded-lg"
                key={order._id}>
                <p className="text-xs text-gray-700 font-extrabold mb-4">
                  ORDER ID: ECOM{order._id}
                </p>
                <div className="flex flex-wrap gap-2">
                  {order.products.map((item) => (
                    <div
                      className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
                      key={item.product._id}>
                      <img
                        className="object-cover w-full h-full"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <p className="text-gray-700 text-sm font-semibold">
                      Order Placed:
                    </p>
                    <p className="font-bold">{formatedDate(order.createdAt)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700 text-sm font-semibold">
                      Total Amount:
                    </p>
                    <p className="font-bold">${order.totalAmount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="container mx-auto px-20 py-8 flex justify-between items-center">
            <button
              className={`bg-gray-800 pb-1 px-2 rounded-md transition ${
                isPreviousDisabled
                  ? `opacity-50 cursor-not-allowed`
                  : `hover:bg-gray-700`
              }`}
              onClick={handlePrevious}
              disabled={isPreviousDisabled}>
              <ArrowLeft className="inline text-white" size={20} />
            </button>
            <h4 className="text-blue-950">{page}</h4>
            <button
              className={`bg-gray-800 pb-1 px-2 rounded-md transition ${
                isNextDisabled
                  ? `opacity-50 cursor-not-allowed`
                  : `hover:bg-gray-700`
              }`}
              onClick={handleNext}
              disabled={isNextDisabled}>
              <ArrowRight className="inline text-white" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

const EmptyOrdersUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 w-full px-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold text-gray-600">No Orders Yet!</h3>
    <p className="text-gray-400">
      You haven’t placed any orders yet. Let’s find something you’ll love!
    </p>
    <Link
      className="mt-4 rounded-md bg-yellow-500 px-6 py-2 text-white transition-colors hover:bg-yellow-600"
      to="/">
      Start Shopping
    </Link>
  </motion.div>
);
