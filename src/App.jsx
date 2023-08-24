import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import './App.css'

function App() {
 

  return (
    <>
     <div id="main-section">
     
         <Navbar /> 
          <Routes>       
            <Route path="/" element={ <Home />} />
            <Route path="/cart" element={ <Cart />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/signup" element={ <Signup />} />
          </Routes>
   
    </div>    
    </>
  )
}

export default App
