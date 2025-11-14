import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = "medium",
  text = "Loading ",
  className = "",
  showText = true,
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xl: "text-xl",
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-screen ${className}`}
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

      {/* Loading Text */}
      {showText && text && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <p className={`text-gray-600 font-medium ${textSizes[size]} mb-2`}>
            {text}
            {/* Dots Animation */}
            <span className="inline-flex justify-center space-x-1">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="w-1 h-1 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: dot * 0.2,
                  }}
                />
              ))}
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Additional specialized loading components
export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <LoadingSpinner
      size="large"
      text="Preparing your experience..."
      className="min-h-screen"
    />
  </div>
);

export const InlineLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner size="small" text={text} className="py-8" showText={!!text} />
);

export const ButtonLoader = () => (
  <div className="flex items-center justify-center">
    <motion.div
      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default LoadingSpinner;