import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "banner/menShirts.avif",
  "banner/menPants.avif",
  "banner/shoes.avif",
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto sliding
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div>
      <div
        className="relative h-[35vh] sm:h-[50vh] lg:h-[80vh] rounded-xl overflow-hidden mx-2 md:mx-8 mt-4"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/5" />
        </div>
      </div>
      {/* INDICATORS */}
      <div className="absolute rounded-xl p-2 bottom-[-30px] left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${
              index === current
                ? "bg-black w-8 h-2"
                : "bg-black/50 w-2 h-2 hover:bg-black/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
