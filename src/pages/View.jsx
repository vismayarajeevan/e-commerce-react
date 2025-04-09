

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { Heart, ShoppingCart, Star } from 'lucide-react';

const View = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the product data from an API
    const fetchProduct = async () => {
      try {
        // Simulate API call
        const sampleProducts = [
          {
            id: 1,
            name: "skincare product",
            price: 99,
            image: "https://welpix.com/wp-content/uploads/2024/06/A-guide-to-skincare-product-photography.webp",
            brand: "Sample Brand",
            category: "Skincare",
            description: "Premium skincare product for all skin types",
            reviews: [
              {
                user: "Happy Customer",
                rating: 5,
                comment: "Great product! My skin feels amazing."
              }
            ]
          }
        ];
        
        const foundProduct = sampleProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <p>Product not found</p>
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
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover object-center"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-3 px-4 rounded-lg hover:from-blue-900 hover:to-indigo-950 transition-colors"
              >
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </button>
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Product ID: {product.id}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-800 mt-2">${product.price}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Brand: <span className="font-medium text-gray-900">{product.brand}</span></p>
              <p className="text-sm text-gray-600">Category: <span className="font-medium text-gray-900">{product.category}</span></p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {product.reviews && product.reviews.map((review, index) => (
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
          </div>
        </div>
      </div>
    </>  
  )
}

export default View;