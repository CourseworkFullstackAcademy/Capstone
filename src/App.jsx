import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import Login from "./pages/Login";
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
          </Routes>
   
    </div>    
    </>
  )
}

export default App
