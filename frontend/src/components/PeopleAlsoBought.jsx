import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useCartStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(
          error.response.data.message || "An error occurred while fetching"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-700">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recommendations.map((product) => (
          <ProductCard
            className="h-40"
            key={product._id}
            product={product}
            inCart={useCartStore.getState().isInCart(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
