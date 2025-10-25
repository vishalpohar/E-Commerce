import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {motion} from "framer-motion";

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

  const isPreviousDisabled = page === 1;
  const isNextDisabled = page === totalPages;

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

  return (
    <div className="text-gray-700">
      <h1 className="text-gray-700 mx-20 text-center text-3xl sm:text-4xl font-bold">Orders</h1>
      {Array.isArray(orders) && orders.length > 0 ? (
        <div className="container mx-auto px-20 py-8">
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
        </div>
      ) : (
        <div className="text-black">No orders</div>
      )}

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
  );
};

export default OrdersPage;
