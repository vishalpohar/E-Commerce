import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import LoadingSpinner from "../components/LoadingSpinner";
import PeopleAlsoBought from "../components/PeopleAlsoBought";

const stripePromise = loadStripe(
  "pk_test_51SFAjxKkfSkHjMbFaeOfZNaqmCFCr8MSkiVek6iKWjTBGQS2R3T74IDiappe8KhaqjI6eovUiCrAVBKPpnM8xBKZ00KNp6Vgue"
);

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const { fetchProductById, product } = useProductStore();
  const { user } = useUserStore();
  const { addToCart, isInCart, coupon } = useCartStore();
  const navigate = useNavigate();

  const inCart = isInCart(productId);

  const handleAddToCart = () => {
    if (!user) {
      toast.success("Please login to Added to cart", { id: "login" });
    } else {
      addToCart(product);
    }
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: [{ ...product, quantity: 1 }],
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  if (!product) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      <div className="flex flex-col md:flex-row w-full h-96 rounded-lg shadow-lg">
        <div className="relative flex overflow-hidden md:rounded-xl px-6 sm:px-20 md:px-2 md:py-4">
          <img className="w-full" src={product.image} alt={product.name} />
        </div>
        <div className="flex flex-col px-3 py-3">
          <div className="pb-3">
            <p className="text-gray-700 font-medium md:text-2xl">
              {product.name}
            </p>
            <p className="text-gray-500 text-xs md:text-xl">
              {product.description}
            </p>
            <p className="text-gray-800 font-semibold md:text-2xl px-3 py-2">
              $ {product.price}
            </p>
          </div>
          <div className="flex flex-row">
            {inCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center">
                Go to Cart
                <ArrowRight className="inlline size-4 ml-1" />
              </button>
            ) : (
              <button
                className="flex items-center justify-center text-sm font-semibold bg-gray-600 rounded px-3 py-2"
                onClick={handleAddToCart}>
                <ShoppingCart size={16} className="mr-2 md:size-8" />
                Add to Cart
              </button>
            )}

            <button
              className="bg-yellow-500 hover:bg-yellow-400 font-semibold rounded ml-12 px-8 py-2"
              onClick={handlePayment}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="mx-auto mt-6 w-full flex-1 space-y-6 lg:mt-0 lg:w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        <PeopleAlsoBought />
      </motion.div>
    </div>
  );
};

export default ProductDetailsPage;
