


import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { getAllProductAPI } from '../services/allAPI';

const Home = () => {
  const [items, setItems] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const getAllProduct = async () => {
    try {
      const result = await getAllProductAPI()
      console.log("API Response:", result)
      
      if(result.status === 200) {
        setItems(result.data)
        // Initialize image indices for all products
        const initialIndices = {}
        result.data.forEach(product => {
          initialIndices[product._id] = 0
        })
        setCurrentImageIndex(initialIndices)
      } else {
        console.error("Failed to fetch products:", result.statusText)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Call getAllProduct when component mounts
  useEffect(() => {
    getAllProduct()
  }, []) // Empty dependency array means this runs once on mount

  // Auto-slide effect
  useEffect(() => {
    const intervalIds = {}
    
    items.forEach(product => {
      if (product.images?.length > 1) {
        intervalIds[product._id] = setInterval(() => {
          setCurrentImageIndex(prev => {
            const currentIndex = prev[product._id]
            const nextIndex = (currentIndex + 1) % product.images.length
            return { ...prev, [product._id]: nextIndex }
          })
        }, 3000)
      }
    })

    // Cleanup function to clear intervals
    return () => {
      Object.values(intervalIds).forEach(clearInterval)
    }
  }, [items]) // Re-run when items change

  return (
    <div>
      <Header insideHome={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {items.length === 0 ? (
          <div className="text-center py-10">
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-w-16 aspect-h-9">
                  <div className="relative w-full h-48 overflow-hidden">
                    {product.images?.length > 0 ? (
                      <>
                        <img
                          src={product.images[currentImageIndex[product._id] || 0]}
                          alt={product.title}
                          className="w-full h-full object-cover transition-opacity duration-500"
                        />
                        {product.images.length > 1 && (
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                            {product.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [product._id]: index
                                  }))
                                }}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex[product._id] 
                                    ? 'w-4 bg-white' 
                                    : 'w-2 bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image Available</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.title}
                    </h3>
                    <span className="text-green-600 font-semibold">${product.price}</span>
                  </div>
                  <Link
                    to={`/view/${product._id}`}
                    state={{ product }} 
                    className="inline-block w-full text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4 rounded-lg hover:from-blue-900 hover:to-indigo-950 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home