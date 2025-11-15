import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import AutoCarousel from "../components/AutoCarousel";
import { motion } from "framer-motion";

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel */}
      <div className="relative">
        <AutoCarousel />
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Categories Section */}
        <section className="mb-16 lg:mb-24">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Collection
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover curated fashion pieces that blend style with
              sustainability
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            <CategoryItem />
          </div>
        </section>

        {/* Featured Products */}
        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
