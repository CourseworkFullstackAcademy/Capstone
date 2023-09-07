import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/shop/Home"
import Cart from "./pages/cart/Cart"
import { Navbar } from "./components/Navbar"
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup"
import './App.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ token, setToken ] = useState("");

  return (
  
     <div id="main-section">
     
         <Navbar /> 
          <Routes>       
            <Route path="/" element={ <Home />} />
            <Route path="/cart" element={ <Cart />} />
            <Route path="/login" element={ <Login setToken={setToken} />} />
            <Route path="/signup" element={ <Signup />} />
          </Routes>
   
    </div>    
   
  )
}

export default App
