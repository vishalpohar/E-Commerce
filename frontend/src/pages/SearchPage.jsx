import { useLocation } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchPage = () => {
  const { search } = useLocation(); // gives "?q=shoes"
  const query = new URLSearchParams(search).get("query"); // "shoes"
  const { products, searchProducts, loading } = useProductStore();

  useEffect(() => {
    if (query) searchProducts(query);
  }, [query]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="md:py-8">
      {products.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-20 mb-52">
          <div className="text-center mx-auto">
            <img
              className="ml-28"
              width={250}
              src="/productsNotFound.jpg"
              alt="product not found"
            />
            <h1 className="text-gray-500 font-bold text-4xl">
              No Products Found
            </h1>
            <p className="text-gray-400 font-bold text-2xl">
              Your Search did not match any products.
            </p>
            <p className="text-gray-400 font-bold text-2xl">
              Please try again...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
