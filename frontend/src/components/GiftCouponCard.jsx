import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag, X, CheckCircle, Gift } from "lucide-react";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = async () => {
    if (!userInputCode.trim()) return;

    setIsLoading(true);
    try {
      await applyCoupon(userInputCode);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setIsLoading(true);
    try {
      await removeCoupon();
      setUserInputCode("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transform transition-all duration-500 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Apply Coupon</h2>
      </div>

      <div className="space-y-4">
        {/* Input Field */}
        <div>
          <label
            htmlFor="voucher"
            className="block text-sm font-medium text-gray-700 mb-2">
            Enter coupon code
          </label>
          <div className="relative">
            <input
              type="text"
              id="voucher"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g. SUMMER25"
              value={userInputCode}
              onChange={(e) => setUserInputCode(e.target.value.toUpperCase())}
              disabled={isCouponApplied}
            />
            {isCouponApplied && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isCouponApplied && coupon ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {coupon.code} - {coupon.discountPercentage}% off applied
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-red-300 text-red-600 hover:bg-red-50 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRemoveCoupon}
              disabled={isLoading}>
              <X className="w-4 h-4" />
              {isLoading ? "Removing..." : "Remove Coupon"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleApplyCoupon}
            disabled={!userInputCode.trim() || isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Applying...
              </div>
            ) : (
              "Apply Coupon"
            )}
          </button>
        )}

        {/* Available Coupon Info */}
        {coupon && !isCouponApplied && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              You have a coupon available: <strong>{coupon.code}</strong> -{" "}
              {coupon.discountPercentage}% off
            </p>
          </div>
        )}
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Enter your coupon code above to apply discount to your order
      </p>
    </div>
  );
};

export default GiftCouponCard;