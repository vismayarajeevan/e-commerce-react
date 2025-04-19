
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Truck, Search, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = ({ insideHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isLoggedIn, logout, user } = useContext(AuthContext); // Assuming user data is available

  // Get the first letter of the username
  const getFirstLetter = () => {
    if (user && user.userName) {
      return user.userName.charAt(0).toUpperCase();
    }
    return '';
  };

  return (
    <nav className="fixed w-full bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white">ShopEase</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {insideHome && (
              <div className="relative">
                <input
                  className="w-48 lg:w-64 px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  type="text"
                  placeholder="Search products..."
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
              </div>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-1 text-white hover:text-white/90 transition group"
                >
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">Wishlist</span>
                </Link>
                
                <Link
                  to="/cart"
                  className="flex items-center space-x-1 text-white hover:text-white/90 transition group"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">Cart</span>
                </Link>

                <div className="relative ml-2">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-colors"
                  >
                    {getFirstLetter()}
                  </button>

                  {/* Dropdown menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user?.userName || 'User'}</p>
                        <p className="text-gray-500 text-xs">{user?.email || ''}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 group"
              >
                <span className="text-white font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4 space-y-4`}>
          {insideHome && (
            <div className="relative mt-4">
              <input
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Search products..."
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          )}

          {isLoggedIn ? (
            <>
              <Link
                to="/wishlist"
                className="flex items-center space-x-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </Link>

              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-white font-medium">{user?.userName || 'User'}</p>
                <p className="text-white/70 text-sm">{user?.email || ''}</p>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-3 text-white hover:bg-white/10 w-full px-4 py-3 rounded-lg transition"
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition"
            >
              <span className="text-white font-medium">Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;