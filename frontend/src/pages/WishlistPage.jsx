import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../stores/useWishlistStore";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import { useCartStore } from "../stores/useCartStore";
import SkeletonLoader from "../components/SkeletonLoader";

const WishlistPage = () => {
  const { getWishlist, wishlist, isInWishlist, loading } = useWishlistStore();
  const { isInCart } = useCartStore();

  useEffect(() => {
    getWishlist();
  }, [wishlist.length, getWishlist]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <div>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Your Wishlist
                  </h1>
                  <p className="text-gray-600">
                    Keep track of products you're planning to buy
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {wishlist?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  inCart={isInCart(product._id)}
                  inWishlist={isInWishlist(product._id)}
                />
              ))}
            </div>

            {/* People Also Bought */}
            <div className="mt-12">
              <PeopleAlsoBought />
            </div>
          </div>
        )}

        {!loading && wishlist.length === 0 && (
          <div className="col-span-full min-h-[90vh] flex text-center">
            <div className="max-w-md m-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600">
                Looks like you haven’t added anything yet. Browse products and
                add your favorites to your wishlist.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
