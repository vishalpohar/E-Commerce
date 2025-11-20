import { ArrowRight, Eye, Handbag, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { formatPriceInRupees } from "../utils/formatCurrency";
import { motion } from "framer-motion";
import { useWishlistStore } from "../stores/useWishlistStore";

const ProductCard = ({ product, inCart = false, inWishlist = false }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const navigate = useNavigate();

  inWishlist = isInWishlist(product._id);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleWishlist = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <Link
        className="relative block overflow-hidden bg-gray-50"
        to={`/product-details/${product._id}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="w-full h-48 object-cover transition-transform duration-500"
          src={product.image}
          alt={product.name}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        <div className="absolute top-2 right-2">
          <button
            className="bg-white p-2 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              handleWishlist(product);
            }}>
            <Heart
              className={`w-5 h-5 transition-all duration-300
              ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors duration-200">
            <Eye className="w-4 h-4 text-gray-700" />
          </motion.button>
        </div>

        {/* In Cart Badge */}
        {inCart && (
          <div className="absolute top-4 left-4">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full" />
              In Bag
            </div>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/product-details/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-5">
          <span className="text-2xl font-bold text-gray-900">
            {formatPriceInRupees(product.price)}
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            inCart ? navigate("/cart") : handleAddToCart(product)
          }
          className={`relative overflow-hidden w-full text-sm font-semibold py-4 px-6 transition-all duration-300 flex items-center justify-center shadow-sm group ${
            inCart
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-900 text-white"
          }`}>
          {/* Shine overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

          {inCart ? (
            <>
              SEE BAG
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              <Handbag className="mr-2 w-6 h-6" />
              ADD TO BAG
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
