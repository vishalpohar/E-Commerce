import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { TrendingUp } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isInCart } = useCartStore();
  const {isInWishlist} = useWishlistStore();

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
    <section className="mt-12">
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

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2 px-2">
          {recommendations.map((product) => (
            <div key={product._id} className="min-w-[280px] max-w-[280px]">
              <ProductCard
                product={product}
                inCart={isInCart(product._id)}
                inWishlist={isInWishlist(product._id)}
                compact
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleAlsoBought;