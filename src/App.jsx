
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Otp from './pages/Otp'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import View from './pages/View'
import ProtectedRoute from './components/ProtectRoute'
import { ToastContainer } from 'react-toastify'

function App() {
  const location = useLocation();
  return (
    <>

<ToastContainer/>

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/Otp' element={<Otp/>}/>

      <Route path="/wishlist" element={
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        } />
        
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

      <Route path='/view/:id' element={<View/>}/>



     </Routes>

     {!["/login", "/Otp"].includes(location.pathname) && <Footer />}

    </>
  )
}

export default App
