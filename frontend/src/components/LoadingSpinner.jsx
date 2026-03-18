import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center min-h-screen ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}>
      {/* Main Spinner Container */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}
        />

        {/* Animated Ring */}
        <motion.div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export const ThreeDotsLoader = () => (
  <ThreeDots
    height="50"
    width="50"
    color="#2563eb"
    ariaLabel="three-dots-loading"
    visible={true}
  />
);

export default LoadingSpinner;
