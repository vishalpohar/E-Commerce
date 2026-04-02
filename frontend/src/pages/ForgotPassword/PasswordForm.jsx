import { AlertCircle, CheckCircle, Lock } from "lucide-react";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utils/validation";
import { useState } from "react";

const PasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  resetPassword,
  passwordErrors,
  setPasswordErrors,
  otp,
  loading,
}) => {
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({});
  const confirmValidation = (event) => {
    setConfirmPasswordErrors(
      validateConfirmPassword(newPassword, event.target.value),
    );
  };
  return (
    <>
      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            placeholder="Create new password"
            className="w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordErrors(validatePassword(e.target.value));
            }}
            onBlur={(e) => setPasswordErrors(validatePassword(e.target.value))}
            required
          />
        </div>

        {/* Password Requirements */}
        {Object.keys(passwordErrors).length > 0 && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-800 space-y-1">
                {passwordErrors.length && <p>• {passwordErrors.length}</p>}
                {passwordErrors.uppercase && (
                  <p>• {passwordErrors.uppercase}</p>
                )}
                {passwordErrors.lowercase && (
                  <p>• {passwordErrors.lowercase}</p>
                )}
                {passwordErrors.number && <p>• {passwordErrors.number}</p>}
                {passwordErrors.special && <p>• {passwordErrors.special}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            placeholder="Confirm new password"
            className={`w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${confirmPasswordErrors.status === "error" && "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"}`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              confirmValidation(e);
            }}
            onBlur={confirmValidation}
            required
          />
        </div>
        {confirmPasswordErrors && (
          <p
            className={`${confirmPasswordErrors.status === "success" ? "text-green-500" : "text-red-500"} text-xs mt-1 flex items-center gap-1`}>
            {confirmPasswordErrors.icon && (
              <confirmPasswordErrors.icon className="w-3 h-3" />
            )}
            {confirmPasswordErrors.message}
          </p>
        )}
      </div>

      <button
        onClick={resetPassword}
        disabled={
          loading ||
          !otp ||
          !newPassword ||
          !confirmPassword ||
          newPassword !== confirmPassword
        }
        aria-label="Reset Password"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Resetting Password...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Reset Password
          </>
        )}
      </button>
    </>
  );
};

export default PasswordForm;
