import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Search,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      toast.error("search field cannot be empty");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false); // hide dropdown
      }
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-yellow-600">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-between items-center">
            <Link
              to="/"
              className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-500 items-center space-x-2 flex">
              E-Commerce
            </Link>

            {/* === Desktop Navbar === */}
            <nav className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-300 hover:text-yellow-500 transition duration-300 ease-in-out"
                hidden={showSearch}>
                <Search />
              </button>
              {user && (
                <>
                  <Link
                    to={"/cart"}
                    className="hidden md:flex relative group font-medium px-1 py-2">
                    <ShoppingCart
                      className="inline-block mr-1 group-hover:text-yellow-400 transition duration-300 ease-in-out"
                      size={24}
                    />
                    <span className="hidden sm:inline md:text-base group-hover:text-yellow-400 transition duration-300 ease-in-out">
                      Cart
                    </span>
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-yellow-400 transition duration-300 ease-in-out">
                        {cart.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to={"/orders"}
                    className="hidden md:flex relative group font-medium px-1 py-2">
                    <span className="inline md:text-base group-hover:text-yellow-400 transition duration-300 ease-in-out">
                      Orders
                    </span>
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  className="hidden md:flex text-white font-medium relative group px-1 py-2"
                  to={"/secret-dashboard"}>
                  <span className="inline text-xs md:text-base group-hover:text-yellow-400 transition duration-300 ease-in-out">
                    Dashboard
                  </span>
                </Link>
              )}
              {user ? (
                <button
                  className="hidden md:flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out"
                  onClick={logout}>
                  <LogOut size={16} />
                  <span className="inline ml-2 text-xs md:text-base">
                    Log Out
                  </span>
                </button>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="hover:text-yellow-500 text-yellow-300 font-bold py-1 rounded-md flex items-center transition duration-300 ease-in-out">
                    Login
                  </Link>
                  /
                  <Link
                    to={"/signup"}
                    className="hover:text-yellow-500 text-yellow-300 font-bold py-1 rounded-md flex items-center transition duration-300 ease-in-out">
                    Sign Up
                  </Link>
                </>
              )}

              {/* === Mobile Navbar === */}
              <div className="flex md:hidden items-center gap-3 justify-between">
                {user && (
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-300 hover:text-yellow-500 transition">
                    <Menu />
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div
        ref={searchRef}
        className={`flex justify-center items-center overflow-hidden transition-all ease-in-out 
        ${
          showSearch
            ? "h-10 mb-6 opacity-100 duration-500"
            : "h-0 opacity-0 duration-200"
        }
      `}>
        <div className="relative w-3/4">
          <input
            type="search"
            placeholder="Search for products..."
            className="border-2 border-gray-500 rounded-3xl outline-none pl-4 pr-10 py-1.5 w-full bg-white text-black transition-all duration-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            className="absolute right-4 top-2.5 text-gray-700 cursor-pointer hover:text-yellow-600 transition"
            size={20}
          />
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={dropDownRef}
            className="absolute top-14 right-0 z-40"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}>
            <div className="bg-white flex flex-col text-end rounded-sm shadow-lg w-[40vw] p-4 pl-2">
              {user && (
                <div className="flex flex-col">
                  <Link
                    to={"/cart"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group py-1">
                    <span className="text-lg font-bold text-yellow-500 group-hover:text-yellow-600">
                      Cart
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                  <Link
                    to={"/orders"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group py-1">
                    <span className="text-lg font-bold text-yellow-500 group-hover:text-yellow-600">
                      Orders
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              )}

              {isAdmin && (
                <Link
                  className="relative group py-1"
                  to={"/secret-dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="text-lg font-bold text-yellow-500 group-hover:text-yellow-600">
                    Dashboard
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}

              <hr />

              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="group text-end py-1">
                  <span
                    className="text-lg
                  font-bold
                  text-red-600
                  group-hover:text-red-800">
                    Log Out
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
