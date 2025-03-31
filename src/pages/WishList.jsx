


import React from 'react';
import { Link } from 'react-router-dom';

import { Heart, ShoppingCart, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';

const WishList = () => {
  

 

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-8 w-8 text-blue-800" />
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src="https://welpix.com/wp-content/uploads/2024/06/A-guide-to-skincare-product-photography.webp"
                      alt=""
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 truncate">
                      
                    </h3>
                    <div className="flex justify-between gap-4">
                      <button
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-600 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                      </button>
                    </div>
                  </div>
                </div>
              
            </div>
          
        
      </div>
    </>
  );
};

export default WishList;