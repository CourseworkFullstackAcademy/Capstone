import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/shop/Home"
import Cart from "./pages/cart/Cart"
import { Navbar } from "./components/Navbar"
import CartBanner from "./components/CartBanner";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup"
import Checkout from "./pages/checkout/Checkout"
import LoginFromCheckout from "./pages/checkout/LoginFromCheckout";
import SingleProduct from "./pages/Product/SingleProduct";
import './App.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ token, setToken ] = useState("");  
  // eslint-disable-next-line no-unused-vars
  const [ id, setId] = useState("")
  const [ setPaymentSubmitted ] = useState(false)
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
            <Route path="/product/:id" element={ <SingleProduct />} />
            <Route path="/login" element={ <Login setToken={setToken} />} />
            <Route path="/signup" element={ <Signup setId={setId} />} />
            <Route path="/cart/checkout" element={ <Checkout setPaymentSubmitted={setPaymentSubmitted} />} />
            <Route path="/cart/loginfromcheckout" element={ <LoginFromCheckout setToken={setToken} />} />
          </Routes>
   
    </div>    
   
  )
}

export default App

