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
import { motion, AnimatePresence } from "framer-motion";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [direction, setDirection] = useState(0);
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
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, featuredProducts.length - itemsPerPage)
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  const visibleProducts = featuredProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-10 lg:py-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Featured Collection
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Editor's Picks
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Carefully selected items that define this season's aesthetic
          </motion.p>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProducts.map((product) => {
                const inCart = isInCart(product._id);

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                    {/* Product Image */}
                    <Link to={`/product-details/${product._id}`}>
                      <div className="relative overflow-hidden bg-gray-100">
                        <motion.img
                          whileHover={{ scale: 1.08 }}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {inCart && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                              <div className="w-2 h-2 bg-white rounded-full" />
                              In Bag
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-6">
                      <Link to={`/product-details/${product._id}`}>
                        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-lg leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mb-5">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPriceInRupees(product?.price)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          inCart ? navigate("/cart") : handleAddToCart(product)
                        }
                        className={`relative overflow-hidden w-full font-semibold py-4 px-6 transition-all duration-300 flex items-center justify-center shadow-sm group ${
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
                            <Handbag className="mr-2 w-4 h-4" />
                            ADD TO BAG
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {featuredProducts.length > itemsPerPage && (
            <>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,1)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                disabled={isStartDisabled}
                className={`absolute -left-6 top-1/2 transform -translate-y-1/2 p-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  isStartDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white/80 text-gray-700 hover:shadow-xl border border-gray-200"
                }`}>
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,1)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                disabled={isEndDisabled}
                className={`absolute -right-6 top-1/2 transform -translate-y-1/2 p-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  isEndDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white/80 text-gray-700 hover:shadow-xl border border-gray-200"
                }`}>
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}
        </div>

        {/* Progress Indicators */}
        {featuredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-3 mt-12">
            {Array.from({
              length: Math.ceil(featuredProducts.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(
                    index > Math.floor(currentIndex / itemsPerPage) ? 1 : -1
                  );
                  setCurrentIndex(index * itemsPerPage);
                }}
                className={`rounded-full transition-all duration-300 ${
                  index === Math.floor(currentIndex / itemsPerPage)
                    ? "bg-blue-600 w-8 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
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