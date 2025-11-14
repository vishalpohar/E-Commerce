import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CategoryItem = ({ category, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden h-64 md:h-80 lg:h-96 w-full bg-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}>
      <Link to={`/category${category.href}`} className="block w-full h-full">
        <div className="relative w-full h-full cursor-pointer overflow-hidden">
          {/* Background Image with Overlay */}
          <motion.img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}>
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                {category.name}
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-gray-200 text-base md:text-lg font-medium opacity-90">
                  Explore Collection
                </p>

                <motion.div
                  className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                  transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;