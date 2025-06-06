import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, ShoppingCart, Star,Plus, Minus } from 'lucide-react';
import { addWishlistAPI, removeFromWishlistAPI, getWishlistAPI,addToCartAPI,incrementCartItemAPI,getCartAPI,decrementCartItemAPI } from '../services/allAPI';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../reusableComponents/Toast';



const View = () => {
  const { state } = useLocation();
  const product = state?.product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
   const [cartItem, setCartItem] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
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

          // Check cart status
          const cartResponse = await getCartAPI(reqHeader);
          if (cartResponse.status === 200) {
            const cartProduct = cartResponse.data.cart.find(
              item => item.product._id === product._id
            );
            setCartItem(cartProduct || null);
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

// add to cart 
   const handleAddToCart = async () => {
    if (!isLoggedIn) {
      showToast('Please login to add items to your cart', 'warning');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!product?._id) return;

    setCartLoading(true);
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const response = await addToCartAPI(product._id, 1, reqHeader);
      console.log("cart",response);
      
      if (response.status === 200) {
        setCartItem({
          product: product,
          quantity: 1
        });
        showToast(`${response.data.message}`,'success');
      }
    } catch (error) {
      console.error("Cart error:", error);
      showToast('Failed to add to cart', 'error');
    } finally {
      setCartLoading(false);
    }
  };

  // increment quantity

  const handleIncrement = async () => {
    if (!isLoggedIn || !product?._id) return;

    setCartLoading(true);
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const response = await incrementCartItemAPI(product._id, reqHeader);
      console.log("inc",response);
      
      if (response.status === 200) {
        setCartItem(prev => ({
          ...prev,
          quantity: response.data.product.quantity
        }));
        showToast(`${response.data.message}`,'success');
      }
    } catch (error) {
      console.error("Increment error:", error);
      showToast('Failed to update quantity', 'error');
    } finally {
      setCartLoading(false);
    }
  };

  // decrement quantity

const handleDecrement = async () => {
  if (!isLoggedIn || !product?._id || !cartItem) return;

  setCartLoading(true);
  try {
    const token = localStorage.getItem('token');
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await decrementCartItemAPI(product._id, reqHeader);
    console.log("dec", response);
    
    if (response.status === 200) {
      if (response.data.removed) {
        // Item was removed from cart
        setCartItem(null);
        showToast('Item removed from cart', 'success');
      } else {
        // Quantity was decremented
        setCartItem(prev => ({
          ...prev,
          quantity: response.data.product.quantity
        }));
        showToast('Quantity decreased', 'success');
      }
    }
  } catch (error) {
    console.error("Decrement error:", error);
    showToast('Failed to update quantity', 'error');
  } finally {
    setCartLoading(false);
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
             

              {cartItem ? (
              <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-lg overflow-hidden">
                <button 
                  onClick={handleDecrement}
                  disabled={cartLoading}
                  className="bg-gray-200 hover:bg-gray-300 h-full px-4 py-3 transition-colors disabled:opacity-50"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="font-medium text-lg">
                  {cartItem.quantity}
                </span>
                <button 
                  onClick={handleIncrement}
                  disabled={cartLoading}
                  className="bg-gray-200 hover:bg-gray-300 h-full px-4 py-3 transition-colors disabled:opacity-50"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
                onClick={handleAddToCart}
                disabled={cartLoading}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartLoading ? 'Adding...' : 'Add to Cart'}
              </button>
            )}
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


