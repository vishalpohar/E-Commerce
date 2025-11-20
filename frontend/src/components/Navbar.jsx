import {
  LogOut,
  Search,
  Menu,
  User,
  Package,
  Handbag,
  Heart,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue !== "") {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
      setShowSearch(false);
      setSearchValue("");
    } else if (e.key === "Enter" && searchValue.trim() === "") {
      toast.error("Please enter a search term");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="flex items-center gap-3 text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none hover:scale-105 duration-500">
                <span className="flex items-center tracking-tight">
                  B
                  <Heart
                    size={25}
                    className="mx-1 text-blue-600 drop-shadow-sm"
                    strokeWidth={3}
                    fill="currentColor"
                  />
                  Store
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {isAdmin && (
                <div className="hover:scale-105 duration-200">
                  <Link
                    to="/secret-dashboard"
                    className="flex items-center space-x-1 p-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                    <span className="text-lg font-light">Dashboard</span>
                  </Link>
                </div>
              )}
              {user && (
                <>
                  {/* Cart */}
                  <div className="relative hover:scale-105 duration-200">
                    <Link
                      to="/cart"
                      className="flex items-center space-x-1 p-2 text-gray-800 hover:text-blue-600 transition-colors duration-200 group">
                      <Handbag size={20} />
                      <span className="text-lg font-light">Your Bag</span>
                      {cart.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {cart.length}
                        </motion.span>
                      )}
                    </Link>
                  </div>

                  <div className="hover:scale-105 duration-200">
                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-1 p-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      <Heart size={20} />
                      <span className="text-lg font-light">Wishlist</span>
                    </Link>
                  </div>

                  {/* Orders */}
                  <div className="hover:scale-105 duration-200">
                    <Link
                      to="/orders"
                      className="flex items-center space-x-1 p-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      <span className="text-lg font-light">Orders</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="flex ">
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200">
                <Search size={20} />
              </button>

              <div className="hidden md:flex justify-center items-center">
                {/* User Actions */}
                {user ? (
                  <div className="flex gap-1 justify-center items-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-800 hover:scale-105 transition-all duration-200">
                      <LogOut size={20} />
                      <span className="text-lg font-light">Logout</span>
                    </motion.button>
                    <div className="flex items-center">
                      <UserRound size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-lg">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="hover:scale-105 duration-200">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-800 hover:scale-105 transition-all duration-200">
                      <span className="text-lg font-light">Login</span>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center space-x-3">
                {user ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <Menu size={20} />
                  </motion.button>
                ) : (
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="hover:scale-105 duration-200">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-800 hover:scale-105 transition-all duration-200 shadow-sm font-medium">
                      <span className="text-lg font-light">Login</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            ref={searchRef}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="search"
                placeholder="Search for products, brands, and more..."
                className="w-full pl-12 pr-4 py-4 border-0 text-lg text-gray-700 focus:ring-0 bg-gray-50 rounded-xl"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Press Enter to search
              </span>
              <button
                onClick={() => setShowSearch(false)}
                className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          ref={dropDownRef}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-16 right-4 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 w-64">
          <div className="p-4 space-y-2">
            {user && (
              <>
                <div
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <UserRound
                    className="text-gray-600 group-hover:text-blue-600"
                    size={20}
                  />
                  <span className="font-medium text-gray-700">
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <Handbag
                    className="text-gray-600 group-hover:text-blue-600"
                    size={20}
                  />
                  <span className="font-light text-gray-700">
                    Your Bag ({cart.length})
                  </span>
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <Heart
                    className="text-gray-600 group-hover:text-blue-600"
                    size={20}
                  />
                  <span className="font-light text-gray-700">
                    Your Wishlist
                  </span>
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <Package
                    className="text-gray-600 group-hover:text-blue-600"
                    size={20}
                  />
                  <span className="font-light text-gray-700">Orders</span>
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                <User
                  className="text-gray-600 group-hover:text-blue-600"
                  size={20}
                />
                <span className="font-light text-gray-700">Dashboard</span>
              </Link>
            )}

            <div className="border-t border-gray-100 pt-4">
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group w-full text-left">
                  <LogOut
                    className="text-red-600 group-hover:text-red-700"
                    size={20}
                  />
                  <span className="font-light text-red-600 group-hover:text-red-700">
                    Log Out
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
