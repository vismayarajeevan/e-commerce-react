import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Otp from './pages/Otp'
import Auth from './pages/Auth'
import Footer from './components/Footer'

function App() {
  const location = useLocation();
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/Otp' element={<Otp/>}/>

     </Routes>

     {!["/login", "/Otp"].includes(location.pathname) && <Footer />}

    </>
  )
}

export default App
