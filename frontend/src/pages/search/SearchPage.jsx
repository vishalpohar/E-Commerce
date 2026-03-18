import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowDown } from "lucide-react";

import { useProductStore } from "../../stores/useProductStore";
import { useCartStore } from "../../stores/useCartStore";

import ProductCard from "../../components/ProductCard";
import SkeletonLoader from "../../components/SkeletonLoader";
import EmptySearchPage from "./EmptySearchPage";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");
  const { searchProducts, products, total, totalPages, loading } =
    useProductStore();
  const { isInCart } = useCartStore();
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const isInitialLoading = loading && products.length === 0;

  useEffect(() => {
    if (query) searchProducts(query, sortBy, 1, false);
  }, [query, sortBy]);

  const loadMore = () => {
    searchProducts(query, sortBy, page + 1, true);
    setPage((p) => p + 1);
  };

  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          {/* Controls */}
          {products.length > 0 && (
            <div className="flex flex-col items-end gap-1">
              <div className="relative flex flex-row appearance-none text-gray-700 bg-white border border-gray-300 outline-none rounded-lg px-4 py-2 transition-all duration-200">
                <p>Sort: </p>
                <select
                  className="outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price Low to High</option>
                  <option value="price-high">Price High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {isInitialLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
                 text-gray-800 font-semibold px-6 py-3
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
                    <div className="bg-white border rounded-full hover:scale-105 p-2 animate-bounce">
                      <ArrowDown size={30} strokeWidth={2} />
                    </div>
                  </>
                )}
              </button>
            )}
          </>
        )}

        {products.length <= 0 && <EmptySearchPage query={query} />}
      </div>
    </div>
  );
};

export default SearchPage;
