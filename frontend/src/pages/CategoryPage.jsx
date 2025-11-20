import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../stores/useCartStore";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ChevronDown,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const { fetchProductsByCategory, products, totalPages, loading } =
    useProductStore();
  const { category } = useParams();
  const { isInCart } = useCartStore();
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProductsByCategory(category, sortBy, 1, false);
  }, [category, sortBy]);

  const loadMore = () => {
    const prevHeight = document.body.scrollHeight;

    fetchProductsByCategory(category, sortBy, page + 1, true);
    setPage((p) => p + 1);

    setTimeout(() => {
      window.scrollTo({ top: prevHeight - 300, behavior: "smooth" }, 200);
    });
  };

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  if (loading) return <LoadingSpinner />;

  if (products.length === 0)
    return (
      <div className="col-span-full text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📦</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            We couldn't find any products in this category. Try checking other
            categories.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {categoryName}
              </h1>
              <p className="text-gray-600">
                {products?.length || 0} products available
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none text-gray-700 bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                {sortBy === "price-low" && (
                  <ArrowUpWideNarrow className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                )}
                {sortBy === "price-high" && (
                  <ArrowDownWideNarrow className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              inCart={isInCart(product._id)}
            />
          ))}
        </div>
        {page < totalPages && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="
            mt-10 mx-auto
            bg-white text-gray-800 font-semibold
            px-6 py-3 rounded-xl
            border border-gray-300
            shadow-sm
            hover:bg-gray-100 hover:border-gray-400
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          ">
            {loading ? (
              <>
                <span className="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-5 h-5"></span>
                Loading...
              </>
            ) : (
              <>
                Load More
                <ChevronDown />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
