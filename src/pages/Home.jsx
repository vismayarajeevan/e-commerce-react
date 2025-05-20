


// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import { Link } from 'react-router-dom';
// import { getAllProductAPI } from '../services/allAPI';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useSearch } from '../context/SearchContext';



// const Home = () => {
//   const [allProducts, setAllProducts] = useState([])
//   const [currentImageIndex, setCurrentImageIndex] = useState({})
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const { searchQuery } = useSearch();

//   const productPerPage = 8;

//   // Pagination calculations
//   const totalPage = Math.ceil(allProducts?.length / productPerPage);
//   const currentPageProductLastIndex = currentPage * productPerPage;
//   const currentPageProductFirstIndex = currentPageProductLastIndex - productPerPage;
//   const visibleAllProducts = allProducts?.slice(
//     currentPageProductFirstIndex,
//     currentPageProductLastIndex
//   );

  

//   const getAllProduct = async (searchKey) => {
//   try {
//     setLoading(true);
//     const result = await getAllProductAPI(searchKey)
//     console.log("API Response:", result)
    
//     if(result.status === 200 && result.data.length > 0) {
//       setAllProducts(result.data)
//       const initialIndices = {}
//       result.data.forEach(product => {
//         initialIndices[product._id] = 0
//       })
//       setCurrentImageIndex(initialIndices)
//     } else {
//       setAllProducts([])
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     setAllProducts([])
//   } finally {
//     setLoading(false);
//   }
// }

 

// useEffect(() => {
//   setCurrentPage(1); // Reset pagination
//   getAllProduct(searchQuery);
// }, [searchQuery]);



//   useEffect(() => {
//     const intervalIds = {}
    
//     allProducts.forEach(product => {
//       if (product.images?.length > 1) {
//         intervalIds[product._id] = setInterval(() => {
//           setCurrentImageIndex(prev => {
//             const currentIndex = prev[product._id]
//             const nextIndex = (currentIndex + 1) % product.images.length
//             return { ...prev, [product._id]: nextIndex }
//           })
//         }, 3000)
//       }
//     })

//     return () => {
//       Object.values(intervalIds).forEach(clearInterval)
//     }
//   }, [allProducts])

//   const navigateToNextPage = () => {
//     if (currentPage < totalPage) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const navigateToPrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Loading state UI
//   if (loading) {
//     return (
//       <>
//         <Header insideHome={true} product={allProducts}/>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <div>
//       <Header insideHome={true} />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
//         {allProducts.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-xl text-gray-600">No products available</p>
//             <p className="text-gray-500 mt-2">Check back later or add new products</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//               {visibleAllProducts.map((product) => (
//                 <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
//                   {/* Product image */}
//                   <div className="relative aspect-w-16 aspect-h-9">
//                     <div className="relative w-full h-40 sm:h-48 overflow-hidden">
//                       {product.images?.length > 0 ? (
//                         <>
//                           <img
//                             src={product.images[currentImageIndex[product._id] || 0]}
//                             alt={product.title}
//                             className="w-full h-full object-cover transition-opacity duration-500"
//                           />
//                           {product.images.length > 1 && (
//                             <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
//                               {product.images.map((_, index) => (
//                                 <button
//                                   key={index}
//                                   onClick={(e) => {
//                                     e.stopPropagation()
//                                     setCurrentImageIndex(prev => ({
//                                       ...prev,
//                                       [product._id]: index
//                                     }))
//                                   }}
//                                   className={`h-1 rounded-full transition-all duration-300 ${
//                                     index === currentImageIndex[product._id] 
//                                       ? 'w-4 bg-white' 
//                                       : 'w-2 bg-white bg-opacity-50'
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                           <span className="text-gray-500 text-sm">No Image</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Product details */}
//                   <div className="p-3 sm:p-4 flex-grow flex flex-col">
//                     <div className="flex justify-between items-center mb-2 sm:mb-3">
//                       <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
//                         {product.title}
//                       </h3>
//                       <span className="text-sm sm:text-base text-green-600 font-semibold">
//                         ${product.price}
//                       </span>
//                     </div>
//                     <Link
//                       to={`/view/${product._id}`}
//                       state={{ product }} 
//                       className="mt-auto inline-block w-full text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base hover:from-blue-900 hover:to-indigo-950 transition-colors duration-300"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination controls */}
//             {allProducts.length > productPerPage && (
//               <div className="flex items-center justify-center space-x-4 mt-8 sm:mt-12">
//                 <button
//                   onClick={navigateToPrevPage}
//                   disabled={currentPage === 1}
//                   className={`p-2 rounded-full ${
//                     currentPage === 1
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : 'bg-blue-800 text-white hover:bg-blue-900'
//                   }`}
//                 >
//                   <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
//                 </button>
//                 <span className="text-base sm:text-lg font-medium text-gray-700">
//                   Page {currentPage} of {totalPage}
//                 </span>
//                 <button
//                   onClick={navigateToNextPage}
//                   disabled={currentPage === totalPage}
//                   className={`p-2 rounded-full ${
//                     currentPage === totalPage
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : 'bg-blue-800 text-white hover:bg-blue-900'
//                   }`}
//                 >
//                   <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { getAllProductAPI } from '../services/allAPI';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const Home = () => {
  const [allProducts, setAllProducts] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { searchQuery } = useSearch();

  const productPerPage = 8;

  // Pagination calculations
  const totalPage = Math.ceil(allProducts?.length / productPerPage);
  const currentPageProductLastIndex = currentPage * productPerPage;
  const currentPageProductFirstIndex = currentPageProductLastIndex - productPerPage;
  const visibleAllProducts = allProducts?.slice(
    currentPageProductFirstIndex,
    currentPageProductLastIndex
  );

  const getAllProduct = async (searchKey) => {
    try {
      setLoading(true);
      const result = await getAllProductAPI(searchKey)
      console.log("API Response:", result)
      
      if(result.status === 200 && result.data.length > 0) {
        setAllProducts(result.data)
        const initialIndices = {}
        result.data.forEach(product => {
          initialIndices[product._id] = 0
        })
        setCurrentImageIndex(initialIndices)
      } else {
        setAllProducts([])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setAllProducts([])
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCurrentPage(1); // Reset pagination
    getAllProduct(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const intervalIds = {}
    
    allProducts.forEach(product => {
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

    return () => {
      Object.values(intervalIds).forEach(clearInterval)
    }
  }, [allProducts])

  const navigateToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Header insideHome={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : allProducts.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <>
                <p className="text-xl text-gray-600">No products found for "{searchQuery}"</p>
                <p className="text-gray-500 mt-2">Try a different search term</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    getAllProduct("");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-600">No products available</p>
                <p className="text-gray-500 mt-2">Check back later or add new products</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleAllProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <div className="relative w-full h-40 sm:h-48 overflow-hidden">
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
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        {product.title}
                      </h3>
                      <span className="text-sm sm:text-base text-green-600 font-semibold">
                        ${product.price}
                      </span>
                    </div>
                    <Link
                      to={`/view/${product._id}`}
                      state={{ product }} 
                      className="mt-auto inline-block w-full text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base hover:from-blue-900 hover:to-indigo-950 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {allProducts.length > productPerPage && (
              <div className="flex items-center justify-center space-x-4 mt-8 sm:mt-12">
                <button
                  onClick={navigateToPrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-800 text-white hover:bg-blue-900'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <span className="text-base sm:text-lg font-medium text-gray-700">
                  Page {currentPage} of {totalPage}
                </span>
                <button
                  onClick={navigateToNextPage}
                  disabled={currentPage === totalPage}
                  className={`p-2 rounded-full ${
                    currentPage === totalPage
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-800 text-white hover:bg-blue-900'
                  }`}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home;