import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import AutoCarousel from "../components/AutoCarousel";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/products/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/products/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/products/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/products/glasses.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/products/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/products/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/products/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div>
        <AutoCarousel />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-500 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
