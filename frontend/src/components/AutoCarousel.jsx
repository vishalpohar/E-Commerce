import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "banner/ourCollections.avif",
  "banner/mensFashion.avif",
  "banner/footWear.avif",
  "banner/sunGlasses.avif",
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Auto sliding
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative h-[40vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      {/* IMAGES */}
      <div>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute top-0 left-0 w-full h-full object-fit transition-opacity duration-1000 ease-in-out
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
            alt="bannerImage"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
      </div>

      {/* NAV BUTTONS */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
        <button
          onClick={handlePrevious}
          className="px-1 py-5 bg-white/30 hover:bg-white rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="px-1 py-5 bg-white/30 hover:bg-white rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </button>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
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
