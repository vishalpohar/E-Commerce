import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { formatPriceInRupees } from "../utils/formatCurrency";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product-details/${item._id}`}>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shadow-sm"
              src={item.image}
              alt={item.name}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {item.name}
            </h3>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                Category:{" "}
                <span className="font-medium text-blue-600 capitalize">
                  {item.category}
                </span>
              </p>
              <p className="text-sm text-green-600 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                In stock
              </p>
            </div>

            {/* Price and Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {formatPriceInRupees(item.price)}
                </p>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-semibold text-gray-700">
                    {formatPriceInRupees(item.price * item.quantity)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Quantity Controls and Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              {item.quantity === 1 ? <Trash size={16} /> : <Minus size={16} />}
            </motion.button>

            <span className="px-4 py-1 text-lg font-semibold text-gray-900 min-w-12 text-center">
              {item.quantity}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Plus size={16} />
            </motion.button>
          </div>
        </div>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => removeFromCart(item._id)}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
          <Trash size={18} />
          <span className="font-medium">Remove</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CartItem;
