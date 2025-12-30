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
      className="group bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <Link
        className="relative block overflow-hidden bg-gray-50"
        to={`/product-details/${product._id}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="w-full h-48 object-cover transition-transform duration-500"
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
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
          className={`relative overflow-hidden w-full text-sm font-semibold py-2 px-2 transition-all duration-300 flex items-center justify-center shadow-sm group ${
            inCart
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-900 text-white"
          }`}>
            
          {inCart ? (
            <div className="flex justify-center items-center">
              <span className="text-[10px] md:text-xs">SEE BAG</span>
              <ArrowRight className="ml-2" size={20} />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Handbag className="mr-2" size={22} />
              <span className="text-[10px] md:text-xs">ADD TO BAG</span>
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
