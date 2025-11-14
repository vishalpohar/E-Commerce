import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "banner/ourCollections.webp",
  "banner/mensFashion.webp",
  "banner/footWear.webp",
  "banner/sunGlasses.webp",
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);

    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    if (isPaused || isAnimating) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isAnimating]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
    }),
  };

  return (
    <div
      className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: "easeInOut", duration: 0.8 },
            }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          className="px-2 py-5 bg-white/90 hover:bg-white rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="px-2 py-5 bg-white/90 hover:bg-white rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`rounded-full transition-all duration-500 ${
              index === current
                ? "bg-white w-8 h-2"
                : "bg-white/50 w-2 h-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
