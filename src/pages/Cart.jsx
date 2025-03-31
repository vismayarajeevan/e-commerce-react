
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ShoppingBag, Minus, Plus, Trash2, RefreshCcw, CreditCard } from 'lucide-react';
import Header from '../components/Header';


const Cart = () => {
  
  const [cartTotal, setCartTotal] = useState(0);

  

  const checkOut = () => {
   
    alert("Order confirmed... Thank you for purchasing with us!");
    navigate('/');
  };



  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                          <tr >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://welpix.com/wp-content/uploads/2024/06/A-guide-to-skincare-product-photography.webp"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                   jkkknnn
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  className="p-1 rounded-full hover:bg-gray-100"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">2</span>
                                <button
                                  className="p-1 rounded-full hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">$100</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                       
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
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
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${cartTotal}</p>
                    </div>
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
        
      </div>
    </>
  );
};

export default Cart;