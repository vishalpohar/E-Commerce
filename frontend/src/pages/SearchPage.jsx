import { useLocation } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, ChevronDown, ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");
  const { searchProducts, products, total, totalPages, loading } =
    useProductStore();
  const { isInCart } = useCartStore();
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) searchProducts(query, sortBy, 1, false);
  }, [query, sortBy]);

  const loadMore = () => {
    searchProducts(query, sortBy, page + 1, true);
    setPage((p) => p + 1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Search Results
              </h1>
              {query && (
                <p className="text-gray-600">
                  {products.length > 0
                    ? `Found ${total} results for "${query}"`
                    : `No results found for "${query}"`}
                </p>
              )}
            </div>

            {/* Controls */}
            {products.length > 0 && (
              <div className="flex items-center gap-4 mt-4 lg:mt-0">
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
            )}
          </div>
        </div>

        {/* Results */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{query}". Try checking
                the spelling or using different keywords.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-medium">
                  Go Back
                </button>
                <a
                  href="/categories"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  Browse Categories
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
