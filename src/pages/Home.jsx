// import React from 'react'
// import Header from '../components/Header'
// import { Link } from 'react-router-dom';


// const Home = () => {
//   return (
//     <div>
//       <Header insideHome={true}/>  

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             
//                   <div
//                     className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                   >
//                     <div className="aspect-w-16 aspect-h-9">
//                       <img
//                         src="https://welpix.com/wp-content/uploads/2024/06/A-guide-to-skincare-product-photography.webp"
//                         alt=""
//                         className="w-full h-48 object-cover"
//                       />
//                     </div>
//                     <div className="p-4">
//                     <div className="flex justify-between items-center mb-3">
//                 <h3 className="text-lg font-semibold text-gray-800 truncate">
//                 skincare product
//                 </h3>
//                 <span className="text-green-600 font-semibold">$99</span> 
//               </div>
//                       <Link
                        
//                         className="inline-block w-full text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4 rounded-lg hover:from-blue-900 hover:to-indigo-950 transition-colors duration-300"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
               
//             </div>
//     </div>
//     </div>
//   )
// }

// export default Home



import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample product data - in a real app, this would likely come from an API
  const products = [
    {
      id: 1,
      name: "skincare product",
      price: 99,
      image: "https://welpix.com/wp-content/uploads/2024/06/A-guide-to-skincare-product-photography.webp",
      brand: "Sample Brand",
      category: "Skincare",
      description: "Premium skincare product for all skin types"
    }
    // Add more products as needed
  ];

  return (
    <div>
      <Header insideHome={true}/>  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <span className="text-green-600 font-semibold">${product.price}</span> 
                </div>
                <Link
                  to={`/view/${product.id}`}
                  className="inline-block w-full text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4 rounded-lg hover:from-blue-900 hover:to-indigo-950 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;