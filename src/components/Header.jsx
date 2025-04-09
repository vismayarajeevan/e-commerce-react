
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Truck, Search, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = ({ insideHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

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
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {insideHome && (
              <div className="relative">
                <input
                //   onChange={(e) =>
                //     dispatch(searchProduct(e.target.value.toLowerCase()))
                //   }
                  className="w-48 lg:w-64 px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  type="text"
                  placeholder="Search products..."
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
              </div>
            )}

          {  isLoggedIn?(
 <>
   <Link
   to="/wishlist"
   className="flex items-center space-x-1 text-white hover:text-white/80 transition"
  >
   <Heart className="h-5 w-5" />
   <span className="hidden lg:inline">Wishlist</span>
   
  </Link>
  
  <Link
   to="/cart"
   className="flex items-center space-x-1 text-white hover:text-white/80 transition"
  >
   <ShoppingCart className="h-5 w-5" />
   <span className="hidden lg:inline">Cart</span>
   
  </Link>
 </>
          ):(
            <Link to="/login">Login</Link>
          )
           
            }
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden pb-4 space-y-4`}
        >
          {insideHome && (
            <div className="relative mt-4">
              <input
                // onChange={(e) =>
                //   dispatch(searchProduct(e.target.value.toLowerCase()))
                // }
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Search products..."
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          )}

          <Link
            to="/wishlist"
            className="flex items-center space-x-2 text-white hover:text-white/80 transition px-2 py-1"
          >
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
            
          </Link>

          <Link
            to="/cart"
            className="flex items-center space-x-2 text-white hover:text-white/80 transition px-2 py-1"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
           
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;