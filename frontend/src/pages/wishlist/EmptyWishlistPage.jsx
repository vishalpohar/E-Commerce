const EmptyWishlistPage = () => (
  <div className="col-span-full min-h-[80vh] flex text-center">
    <div className="max-w-md m-auto">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">❤️</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Your wishlist is empty
      </h3>
      <p className="text-gray-600">
        Looks like you haven’t added anything yet. Browse products and add your
        favorites to your wishlist.
      </p>
    </div>
  </div>
);

export default EmptyWishlistPage