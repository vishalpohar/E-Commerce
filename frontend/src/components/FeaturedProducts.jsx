import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Handbag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import { formatPriceInRupees } from "../utils/formatCurrency";
import { motion } from "framer-motion";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart, isInCart } = useCartStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth < 640) setItemsPerPage(1);
      // else 
      if (window.innerWidth < 640) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + itemsPerPage, featuredProducts.length - itemsPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  const visibleProducts = featuredProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="py-10 lg:py-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Featured Collection
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Editor's Picks
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Carefully selected items that define this season's aesthetic
          </motion.p>
        </div>

        {/* Products */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2 h-80">
            {visibleProducts.map((product) => {
              const inCart = isInCart(product._id);

              return (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -6 }}
                  className="group bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  <Link to={`/product-details/${product._id}`}>
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {inCart && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full" />
                          In Bag
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-6">
                    <Link to={`/product-details/${product._id}`}>
                      <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors md:text-lg leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-5">
                      <span className="md:text-2xl font-bold text-gray-900">
                        {formatPriceInRupees(product?.price)}
                      </span>
                    </div>

                    {/* Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        inCart ? navigate("/cart") : handleAddToCart(product)
                      }
                      className={`relative overflow-hidden w-full text-sm font-semibold py-2 px-2 
                      transition-all duration-300 flex items-center justify-center shadow-sm group 
                      ${
                        inCart
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-900 text-white"
                      }`}>
                      {inCart ? (
                        <div className="flex justify-center items-center py-1">
                          <span className="text-[10px] md:text-xs">
                            SEE BAG
                          </span>
                          <ArrowRight className="ml-1" size={20} />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center py-1">
                          <Handbag className="mr-1" size={18} />
                          <span className="text-[10px] md:text-xs">
                            ADD TO BAG
                          </span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          {featuredProducts.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                disabled={isStartDisabled}
                className={`absolute -left-4 top-1/2 transform -translate-y-1/2 px-1 md:px-2 py-2 md:py-3 rounded-xl shadow-lg ${
                  isStartDisabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:shadow-xl"
                }`}>
                <ChevronLeft size={25} />
              </button>

              <button
                onClick={nextSlide}
                disabled={isEndDisabled}
                className={`absolute -right-4 top-1/2 transform -translate-y-1/2 px-1 md:px-2 py-2 md:py-3 rounded-xl shadow-lg ${
                  isEndDisabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:shadow-xl"
                }`}>
                <ChevronRight size={25} />
              </button>
            </>
          )}
        </div>

        {/* Pagination */}
        {featuredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-3 mt-10">
            {Array.from({
              length: Math.ceil(featuredProducts.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`rounded-full transition-all ${
                  index === Math.ceil(currentIndex / itemsPerPage)
                    ? "bg-blue-600 w-8 h-2"
                    : "bg-gray-300 w-2 h-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
