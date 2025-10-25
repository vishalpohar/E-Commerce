import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "banner/electronicSales.webp",
  "banner/newArrivals.webp",
  "banner/newArrivals1.webp",
  "banner/newFashion.webp",
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative carousel w-full">
      {images.map((src, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full h-full ${
            index === current ? "block" : "hidden"
          }`}>
          <img
            src={src}
            className="w-full sm:h-[35vh] lg:h-[50vh] xl:h-[70vh]"
          />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-between mx-4">
        <button
          className="bg-black hover:bg-gray-600 text-white p-2 rounded-3xl"
          onClick={handlePrevious}>
          <ChevronLeft size={20} className="md:size-6 lg:size-8" />
        </button>
        <button
          className="bg-black hover:bg-gray-600 text-white p-2 rounded-3xl"
          onClick={handleNext}>
          <ChevronRight size={20} className="md:size-6 lg:size-8" />
        </button>
      </div>
    </div>
  );
}
