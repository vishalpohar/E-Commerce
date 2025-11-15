import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { href: "/pants", name: "Pants", imageUrl: "/products/jeans.avif" },
  { href: "/shirts", name: "Shirts", imageUrl: "/products/shirts.avif" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/products/tshirts.avif" },
  { href: "/shoes", name: "Shoes", imageUrl: "/products/shoes.avif" },
  { href: "/glasses", name: "Glasses", imageUrl: "/products/glasses.avif" },
  { href: "/jackets", name: "Jackets", imageUrl: "/products/jackets.avif" },
  { href: "/bags", name: "Bags", imageUrl: "/products/bags.avif" },
];

const CategoryItem = () => {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.href}
          to={`/category${category.href}`}
          className="group block relative overflow-hidden h-64 md:h-80 lg:h-96 w-full bg-gray-100">
          {/* Background Image */}
          <motion.img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={233}
            height={349}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              {category.name}
            </h3>
            <p className="text-gray-200 text-sm md:text-base mt-1">
              Explore Collection
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CategoryItem;
