import { Mail, Send } from "lucide-react";

const EmailStep = ({ email, setEmail, sendOtp, loading }) => {
  return (
    <div className="space-y-6">
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We'll send a verification code to this email
        </p>
      </>

      <button
        onClick={sendOtp}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Verification Code
          </>
        )}
      </button>
    </div>
  );
};

export default EmailStep;
