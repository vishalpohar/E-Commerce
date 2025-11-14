import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isInCart } = useCartStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (recommendations.length === 0) return null;

  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Frequently Bought Together
          </h3>
          <p className="text-gray-600 mt-1">
            Products customers often purchase together
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}>
            <ProductCard
              product={product}
              inCart={isInCart(product._id)}
              compact
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PeopleAlsoBought;