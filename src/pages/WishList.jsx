

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart,ShoppingBag,BookHeart } from 'lucide-react';
import Header from '../components/Header';
import { getWishlistAPI, removeFromWishlistAPI } from '../services/allAPI';
import { showToast } from '../reusableComponents/Toast';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const getUserwishlist = async() => {
    const token = localStorage.getItem('token');
    
    if(token) {
      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        setLoading(true); // Set loading to true when starting fetch
        const result = await getWishlistAPI(reqHeader);
        console.log("get",result);
        
        if(result.status === 200) {
          setWishlistItems(result.data.wishlist);
          const initialIndices = {};
          result.data.wishlist.forEach(item => {
            initialIndices[item._id] = 0;
          });
          setCurrentImageIndex(initialIndices);
        }
      } catch (error) {
        console.log(error);
        showToast('Failed to load wishlist', 'error');
      } finally {
        setLoading(false); // Set loading to false when done
      }
    } else {
      setLoading(false); // Also set to false if no token
    }
  }

  useEffect(() => {
    getUserwishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        
        const result = await removeFromWishlistAPI(productId, reqHeader);
        console.log("rem",result);
        
        if (result.status === 200) {
          setWishlistItems(prevItems => 
            prevItems.filter(item => item._id !== productId)
          );
          showToast(`${result.data.message}`, 'success');
        }
      } catch (error) {
        console.log(error);
        showToast('Failed to remove from wishlist', 'error');
      }
    }
  };

  useEffect(() => {
    const intervalIds = {};
    
    wishlistItems.forEach(item => {
      if (item.images?.length > 1) {
        intervalIds[item._id] = setInterval(() => {
          setCurrentImageIndex(prev => {
            const currentIndex = prev[item._id] || 0;
            const nextIndex = (currentIndex + 1) % item.images.length;
            return { ...prev, [item._id]: nextIndex };
          });
        }, 3000);
      }
    });

    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [wishlistItems]);

  // Loading state UI
  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-blue-800" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Product image with Link */}
                <div className="relative aspect-w-1 aspect-h-1">
                  <div className="relative w-full h-48 overflow-hidden">
                    {item.images?.length > 0 ? (
                      <>
                        <Link to={`/view/${item._id}`} state={{ product: item }}>
                          <img
                            src={item.images[currentImageIndex[item._id] || 0]}
                            alt={item.name}
                            className="w-full h-full object-cover transition-opacity duration-500 cursor-pointer"
                          />
                        </Link>
                        {item.images.length > 1 && (
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                            {item.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [item._id]: index
                                  }));
                                }}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex[item._id] 
                                    ? 'w-4 bg-white' 
                                    : 'w-2 bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link to={`/view/${item._id}`} state={{ product: item }}>
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer">
                          <span>No Image Available</span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Product details */}
                <div className="p-4">
                  <Link to={`/view/${item._id}`} state={{ product: item }} className="hover:underline">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4">${item.price}</p>
                  <div className="flex justify-between gap-4">
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      aria-label="Remove from wishlist"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      <Heart className="h-5 w-5 fill-red-600" />
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
            ))}
          </div>
        ) : (
         

          <div className="text-center py-12">
                      <BookHeart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                      <p className="mt-1 text-gray-500">Start adding some items to your wishlist</p>
                      <div className="mt-6">
                        <Link
                          to="/"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
        )}
      </div>
    </>
  );
};

export default WishList;