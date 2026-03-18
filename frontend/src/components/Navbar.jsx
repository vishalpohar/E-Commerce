import {
  LogOut,
  Search,
  Menu,
  Package,
  Handbag,
  Heart,
  UserRound,
  LayoutDashboard,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const navLinks = [
  {
    id: "DASHBOARD",
    name: "Dashboard",
    path: "/secret-dashboard",
    icon: LayoutDashboard,
    adminOnly: true,
  },
  {
    id: "YOUR_BAG",
    name: "Your Bag",
    path: "/cart",
    icon: Handbag,
    showCount: true,
  },
  {
    id: "WISHLIST",
    name: "Wishlist",
    path: "/wishlist",
    icon: Heart,
  },
  {
    id: "ORDERS",
    name: "Orders",
    path: "/orders",
    icon: Package,
  },
];

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenu((prev) => !prev);
  };

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Main Navbar */}
      <nav className="px-2 md:px-6 bg-white text-gray-600 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="relative flex items-center gap-3 text-gray-700 text-3xl font-extrabold duration-500">
                <span className="flex items-center font-serif tracking-tight">
                  EasyBuy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-10 px-2">
              {user && (
                <ul className="flex items-center gap-6 lg:gap-10">
                  {navLinks.map((link) => {
                    if (link.isAdmin && !isAdmin) return null;

                    return (
                      <li key={link.id}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `relative text-lg ${isActive && "text-blue-600 font-semibold border-b-2 border-blue-500"}`
                          }>
                          {link.name}
                          {link.showCount && cart.length > 0 && (
                            <p className="absolute -top-2 -right-4 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                              {cart.length}
                            </p>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex ">
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:text-blue-600 transition-colors hover:scale-105 duration-200">
                <Search size={20} />
              </button>

              <div className="hidden md:flex justify-center items-center">
                {/* User Actions */}
                {user ? (
                  <div className="flex gap-1 justify-center items-center">
                    <button
                      onClick={logout}
                      className="relative group px-4 py-2 hover:text-blue-600 transition-all duration-200">
                      <LogOut size={20} />
                      <span
                        className="
                            absolute top-9 left-1/2 -translate-x-1/2
                            bg-gray-900 text-white text-xs px-3 py-1 rounded-md
                            opacity-0 scale-95
                            group-hover:opacity-100 group-hover:scale-100
                            transition-all duration-200
                          ">
                        logout
                      </span>
                    </button>
                    <div className="flex items-center justify-center">
                      <UserRound
                        size={20}
                        className="border-2 rounded-full border-gray-600"
                      />
                      <span className="text-lg">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:text-blue-600 hover:scale-105 transition-all duration-200">
                    <span className="text-lg font-light">Login</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center space-x-3">
                {user ? (
                  !isMobileMenu && (
                    <button
                      onClick={toggleMobileMenu}
                      className="p-2 hover:text-blue-600 transition-colors duration-200">
                      <Menu size={22} />
                    </button>
                  )
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:text-blue-600 hover:scale-105 transition-all duration-200">
                    <span className="text-lg font-light">Login</span>
                  </Link>
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
      {isMobileMenu && (
        <div className="fixed flex flex-col bg-white top-16 right-0 z-40 w-full h-full p-4">
          <button className="self-end mr-3" onClick={toggleMobileMenu}>
            <X color="#4b5563" />
          </button>
          <div className="w-full flex flex-col items-center mt-24">
            {user && (
              <>
                <div className="flex items-center w-[130px] space-x-3 pb-3">
                  <UserRound
                    className="text-gray-600 group-hover:text-blue-600"
                    size={20}
                  />
                  <span className="text-lg font-light text-gray-700">
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </span>
                </div>

                <ul className="w-full flex flex-col pb-4">
                  {navLinks.map((link) => {
                    if (link.adminOnly && !isAdmin) return null;

                    const Icon = link.icon;

                    return (
                      <li key={link.id} className="w-full">
                        <NavLink
                          to={link.path}
                          onClick={toggleMobileMenu}
                          className={({ isActive }) =>
                            `flex justify-center p-3 transition-colors duration-200 group ${isActive && "bg-blue-50"}`
                          }>
                          <div className="w-[130px] flex items-center gap-3">
                            <Icon
                              className="text-gray-600 group-hover:text-blue-600"
                              size={20}
                            />
                            <span className="text-lg font-light text-gray-700">
                              {link.name}{" "}
                              {link.showCount &&
                                cart.length > 0 &&
                                `(${cart.length})`}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            <hr className="w-full border-t border-gray-400 pb-4" />

            {user && (
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="flex items-center w-[130px] space-x-3 pt-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group text-left">
                <LogOut
                  className="text-red-600 group-hover:text-red-700"
                  size={20}
                />
                <span className="text-lg font-light text-red-600 group-hover:text-red-700">
                  Log Out
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
