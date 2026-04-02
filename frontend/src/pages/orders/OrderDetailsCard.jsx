import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { formatPriceInRupees } from "../../utils/formatCurrency";

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

const OrderDetailsCard = ({ order }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:-translate-y-4 duration-500 animate-fadeSlideUp">
    {/* Order Header */}
    <div className="p-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Order #ECOM{order._id}</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPriceInRupees(order.totalAmount)}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              order.status,
            )}`}>
            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) ||
              "Processing"}
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
          const product = item.product;

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
        <button
          aria-label="View Details"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-medium">
          View Details
        </button>
        <button
          aria-label="Track Order"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          Track Order
        </button>
      </div>
    </div>
  </div>
);

export default OrderDetailsCard;
