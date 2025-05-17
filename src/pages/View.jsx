
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { addWishlistAPI, removeFromWishlistAPI, getWishlistAPI } from '../services/allAPI';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../reusableComponents/Toast';

const View = () => {
  const { state } = useLocation();
  const product = state?.product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (isLoggedIn && product?._id) {
        const token = localStorage.getItem('token');
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        
        try {
          const response = await getWishlistAPI(reqHeader);
          if (response.status === 200) {
            const isProductInWishlist = response.data.wishlist.some(
              item => item._id === product._id
            );
            setIsInWishlist(isProductInWishlist);
          }
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };
    
    checkWishlistStatus();
  }, [isLoggedIn, product?._id]);

  const handleWishlistAction = async () => {
    if (!isLoggedIn) {
      showToast('Please login to add items to your wishlist', 'warning');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!product?._id) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      let response;
      if (isInWishlist) {
        response = await removeFromWishlistAPI(product._id, reqHeader);
      } else {
        response = await addWishlistAPI(product._id, reqHeader);
      }
      
      if (response.status === 200) {
        setIsInWishlist(!isInWishlist);
        showToast(
          isInWishlist 
            ? 'Removed from wishlist' 
            : 'Added to wishlist'
        );
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      showToast('Failed to update wishlist', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <p>Product not found. Please go back and try again.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start py-8">
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <div className="relative w-full h-[400px] overflow-hidden">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images?.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-blue-500 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                className={`flex-1 flex items-center justify-center gap-2 ${
                  isInWishlist
                    ? 'bg-gradient-to-r from-red-600 to-red-700'
                    : 'bg-gradient-to-r from-blue-800 to-indigo-900'
                } text-white py-3 px-4 rounded-lg hover:opacity-90 transition-colors`}
                onClick={handleWishlistAction}
                disabled={isLoading}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-white' : ''}`} />
                {isLoading ? (
                  'Processing...'
                ) : isInWishlist ? (
                  `Remove from Wishlist`
                ) : (
                  `Add to Wishlist`
                )}
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Product ID: {product._id}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
              <p className="text-2xl font-bold text-blue-800 mt-2">${product.price}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Brand: <span className="font-medium text-gray-900">{product.brand || 'N/A'}</span></p>
              <p className="text-sm text-gray-600">Category: <span className="font-medium text-gray-900">{product.category || 'N/A'}</span></p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description || 'No description available'}</p>
            </div>

            {product.reviews && product.reviews.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>  
  );
};

export default View;