import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { ArrowLeft, ArrowRight, ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPriceInRupees } from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const { ordersByPage, totalPages, getMyOrders, loading } = useProductStore();

  const handleNext = () => {
    setPage((p) => p + 1);
  };

  const handlePrevious = () => {
    setPage((p) => p - 1);
  };

  const isPreviousDisabled = ordersByPage.length === 0 || page === 1;
  const isNextDisabled =
    ordersByPage.length === 0 || (totalPages != null ? page === totalPages : true);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    getMyOrders(page);
    window.scrollTo({top:0});
  }, [page, getMyOrders]);

  if (loading) return <LoadingSpinner />;

  if (ordersByPage.length === 0) {
    return <EmptyOrdersUI />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 gap-6">
          {ordersByPage[page]?.map((order) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Order #ECOM{order._id}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPriceInRupees(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}>
                      {order.status?.charAt(0).toUpperCase() +
                        order.status?.slice(1) || "Processing"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map((item) => {
                    const product = order.productDetails.find(
                      (p) => p._id === item.product
                    );

                    return (
                      <div key={product._id}>
                        <Link to={`/product-details/${product._id}`}>
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                                {product.name}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-gray-900 font-medium text-sm">
                                {formatPriceInRupees(product.price)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Order Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-medium">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Track Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isPreviousDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-sm"
              }`}>
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">Page</span>
              <span className="font-semibold text-gray-900">{page}</span>
              <span className="text-gray-600">of {totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isNextDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-sm"
              }`}>
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

const EmptyOrdersUI = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4 transition-all duration-500">
    <div className="text-center max-w-md">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
          <Package className="h-16 w-16 text-blue-400" />
        </div>
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
        No Orders Yet
      </h3>
      <p className="text-gray-600 mb-8 leading-relaxed">
        You haven't placed any orders yet. Discover our amazing products and
        make your first purchase!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
          Start Shopping
          <ShoppingCart className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  </div>
);
