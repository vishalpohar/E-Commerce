import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "banner/menShirts.avif",
  "banner/menPants.avif",
  "banner/shoes.avif",
];

export default function AutoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Auto sliding
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div>
      <div
        className="relative h-[35vh] sm:h-[50vh] lg:h-[80vh] rounded-xl overflow-hidden mx-2 md:mx-8 mt-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        {/* IMAGES */}
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-full h-full flex-shrink-0 object-cover"
                alt="banner"
                draggable="true"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between mx-2 md:mx-6 px-2 md:px-4">
        <button
          onClick={handlePrevious}
          className="bg-white/30 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-300 backdrop-blur-sm">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="bg-white/30 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-300 backdrop-blur-sm">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </button>
      </div>

      {/* INDICATORS */}
      <div className="absolute rounded-xl p-2 bottom-[-30px] left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-black w-8 h-2"
                : "bg-black/50 w-2 h-2 hover:bg-black/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
