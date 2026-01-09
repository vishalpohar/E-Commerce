import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  Share2,
  Shield,
  Truck,
  Clock,
  Star,
  Handbag,
} from "lucide-react";
import axios from "../lib/axios";
import { stripePromise } from "../lib/stripe";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { formatPriceInRupees } from "../utils/formatCurrency";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import { useWishlistStore } from "../stores/useWishlistStore";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const { user } = useUserStore();
  const { fetchProductById, product } = useProductStore();
  const { addToCart, isInCart, coupon } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const navigate = useNavigate();

  const inCart = isInCart(productId);
  const inWishlist = isInWishlist(productId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showName, setShowName] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const toggleName = () => setShowName((prev) => !prev);

  const displayText = (description) => {
    return isExpanded
      ? description
      : description.length > 150
      ? description.substring(0, 150) + "..."
      : description;
  };

  const displayName = (name) => {
    return showName
    ? name
    : name.length > 100
    ? name.substring(0, 100) + "..."
    : name;
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart({ ...product, quantity });
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

  const handlePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: [{ ...product, quantity }],
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
  }, [productId, fetchProductById]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {product /* Breadcrumb */ && (
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 pl-2">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <a
                  href={`/${product.category}`}
                  className="hover:text-blue-600 transition-colors capitalize">
                  {product.category}
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">
                  {product.name.substring(0, 60)}
                  {product.name.length > 60 && <span>...</span>}
                </span>
              </li>
            </ol>
          </nav>
        )}

        <div className="bg-white md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {!product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border shadow rounded-md md:p-2">
              <div className="p-4 w-full mx-auto">
                <div className="flex space-x-4">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-80 shimmer"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 w-full mx-auto my-auto">
                <div className="flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-6 shimmer rounded"></div>
                    <div className="h-6 w-2/4 shimmer rounded"></div>
                    <div className="h-6 w-3/4 shimmer rounded"></div>
                    <div className="h-20 shimmer rounded"></div>
                    <div className="flex space-x-4">
                      <div className="h-8 w-1/4 shimmer rounded"></div>
                      <div className="h-8 w-1/4 shimmer rounded"></div>
                      <div className="h-8 w-1/4 shimmer rounded"></div>
                    </div>
                    <div className="h-6 shimmer rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {displayName(product.name)}
                    {product.name.length > 100 && (
                      <button
                        onClick={toggleName}
                        className="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors">
                        {showName ? "Show less" : "Show more"}
                      </button>
                    )}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= 4
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(128 reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPriceInRupees(product.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPriceInRupees(product.price * 1.2)}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      20% OFF
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {displayText(product.description)}
                    {product.description.length > 150 && (
                      <button
                        onClick={toggleExpanded}
                        className="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors">
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-green-300">
                      In stock <br />{" "}
                      <span className="text-gray-600">Free shipping</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {inCart ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      SEE BAG
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gray-900 hover:bg-gray-950 text-white font-semibold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      <Handbag className="w-5 h-5" />
                      ADD TO BAG
                    </button>
                  )}

                  <button
                    onClick={handlePayment}
                    className="flex-1 bg-gray-700 hover:bg-gray-900 text-white font-semibold py-4 px-6 transition-all duration-200 shadow-lg hover:shadow-xl">
                    BUY NOW
                  </button>

                  {/* Secondary Actions */}
                  <div className="flex gap-2">
                    <button
                      className="p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                      onClick={() => handleWishlist(product)}>
                      <Heart
                        className={`w-5 h-5 ${
                          inWishlist
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <button className="p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row items-center md:justify-center gap-3">
                    <Truck size={25} className="text-green-500" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-600">
                        On orders over ₹1000
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:justify-center gap-3">
                    <Shield size={25} className="text-blue-500" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        2-Year Warranty
                      </p>
                      <p className="text-sm text-gray-600">
                        Quality guaranteed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:justify-center gap-3">
                    <Clock size={25} className="text-orange-500" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900">Support</p>
                      <p className="text-sm text-gray-600">24/7 assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {product && (
          /* People Also Bought */
          <div className="mt-12">
            <PeopleAlsoBought />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
