import { ArrowRight, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, inCart }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  
  const handleAddToCart = (product) => {
    if (user == null) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="flex w-full h-80 md:h-96 relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        to={`/product-details/${product._id}`}>
        <img
          className="object-cover w-full"
          src={product.image}
          alt={product.name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </Link>

      <div className="mt-4 px-5 pb-5">
        <Link to={`/product-details/${product._id}`}>
          <h5 className="md:text-xl font-semibold tracking-tight text-gray-600">
            {product.name}
          </h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl md:text-2xl font-semibold text-gray-700">
                ${product.price}
              </span>
            </p>
          </div>
        </Link>
        {inCart ? (
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-yellow-500 hover:bg-gray-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center">
            Go to Cart
            <ArrowRight className="inlline size-4 ml-1" />
          </button>
        ) : (
          <button
            className="w-full flex items-center justify-center rounded bg-gray-600 px-5 py-2.5 text-center text-xs sm:text-sm font-medium
					 text-white hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            onClick={() => handleAddToCart(product)}>
            <ShoppingCart className="mr-2 md:size-5" />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
