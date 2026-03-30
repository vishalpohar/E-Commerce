import { Clock, KeyRound } from "lucide-react";
import formatTime from "../../utils/formatTime";
import { useEffect } from "react";

const OtpInput = ({
  otp,
  setOtp,
  resendOtp,
  canResend,
  setCanResend,
  timeLeft,
  setTimeLeft,
  loading,
}) => {
  // Timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
    }
    const intervalId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Verification Code
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <KeyRound className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          className="w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      {/* Timer and Resend */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          {timeLeft > 0 ? (
            <span>Code expires in {formatTime(timeLeft)}</span>
          ) : (
            <span className="text-red-500">Code expired</span>
          )}
        </div>
        <button
          onClick={resendOtp}
          disabled={!canResend || loading}
          className={`text-sm font-medium transition-colors ${
            canResend && !loading
              ? "text-blue-600 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}>
          Resend Code
        </button>
      </div>
    </>
  );
};

export default OtpInput;
