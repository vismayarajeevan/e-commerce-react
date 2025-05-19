
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, RefreshCcw, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import { getCartAPI, removeFromCartAPI, emptyCartAPI,incrementCartItemAPI,decrementCartItemAPI } from '../services/allAPI';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../reusableComponents/Toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!isLoggedIn) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const response = await getCartAPI(reqHeader);
      console.log("getcart", response);
      
      if (response.status === 200) {
        setCartItems(response.data.cart);
        // Use the total from API response directly instead of calculating
        setCartTotal(response.data.total.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      showToast('Failed to load cart items', 'error');
    } finally {
      setLoading(false);
    }
  };

  
   const handleIncrement = async (productId) => {
  if (!isLoggedIn || !productId) return;

  // setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await incrementCartItemAPI(productId, reqHeader);
    if (response.status === 200) {
      showToast(`${response.data.message}`, 'success');
      fetchCartItems(); // Refresh cart
    }
  } catch (error) {
    console.error("Increment error:", error);
    showToast('Failed to update quantity', 'error');
  } finally {
    // setLoading(false);
  }
};

const handleDecrement = async (productId) => {
  if (!isLoggedIn || !productId) return;

  // setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await decrementCartItemAPI(productId, reqHeader);
    if (response.status === 200) {
      if (response.data.removed) {
        showToast('Item removed from cart', 'success');
      } else {
        showToast('Quantity decreased', 'success');
      }
      fetchCartItems(); // Refresh cart
    }
  } catch (error) {
    console.error("Decrement error:", error);
    showToast('Failed to update quantity', 'error');
  } finally {
    // setLoading(false);
  }
};


  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const response = await removeFromCartAPI(productId, reqHeader);
      if (response.status === 200) {
        fetchCartItems();
        showToast('Item removed from cart', 'success');
      }
    } catch (error) {
      console.error("Error removing item:", error);
      showToast('Failed to remove item', 'error');
    }
  };

  // Empty cart
  const emptyCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const response = await emptyCartAPI(reqHeader);
      if (response.status === 200) {
        setCartItems([]);
        setCartTotal(0);
        showToast('Cart emptied successfully', 'success');
      }
    } catch (error) {
      console.error("Error emptying cart:", error);
      showToast('Failed to empty cart', 'error');
    }
  };

  // Checkout
  const checkOut = () => {
    alert("Order confirmed... Thank you for purchasing with us!");
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [isLoggedIn]);

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
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
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
        ) : (
          <>
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="h-8 w-8 text-blue-800" />
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={item.product.images?.[0] || 'https://via.placeholder.com/50'}
                                    alt={item.product.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.product.title}
                                  </div>
                                  <div className="text-sm text-gray-500">{item.product.brand}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  className="p-1 rounded-full hover:bg-gray-100"
                                  onClick={() => handleDecrement(item.product._id)}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                  className="p-1 rounded-full hover:bg-gray-100"
                                  onClick={() => handleIncrement(item.product._id)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${item.product.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => removeItem(item.product._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                        onClick={emptyCart}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Empty Cart
                      </button>
                      <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-200">
                      <li className="flex justify-between py-4 text-sm">
                        <p>Subtotal</p>
                        <p>${cartTotal}</p>
                      </li>
                      <li className="flex justify-between py-4 text-sm">
                        <p>Shipping</p>
                        <p>Free</p>
                      </li>
                      <li className="flex justify-between py-4 text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${cartTotal}</p>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={checkOut}
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-800 to-indigo-900 hover:from-blue-900 hover:to-indigo-950"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;