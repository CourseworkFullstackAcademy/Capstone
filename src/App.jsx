import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/shop/Home"
import Cart from "./pages/cart/Cart"
import { Navbar } from "./components/Navbar"
import CartBanner from "./components/CartBanner";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup"
import Checkout from "./pages/checkout/Checkout"
import './App.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ token, setToken ] = useState("");
  const location = useLocation();

  //conditionally render cart banner
  const isCartPage = location.pathname === "/cart";

  return (
  
     <div id="main-section">
     
         <Navbar /> 
         {isCartPage && <CartBanner />} {/* Render CartBanner only on the cart page */}
          <Routes>       
            <Route path="/" element={ <Home />} />
            <Route path="/cart" element={ <Cart />} />
            <Route path="/login" element={ <Login setToken={setToken} />} />
            <Route path="/signup" element={ <Signup />} />
            <Route path="/cart/checkout" element={ <Checkout />} />
          </Routes>
   
    </div>    
   
  )
}

export default App
