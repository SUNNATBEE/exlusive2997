import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
// import About from './pages/About'

const App = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  )
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  )

  // LocalStorage bilan sinxronlash
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <div>
      <Header />
      <Outlet context={{ wishlist, setWishlist, cart, setCart }} />
      
      <Footer/>
 
    </div>
  )
}

export default App
