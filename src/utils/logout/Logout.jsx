import "./logout.css";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";

function Logout() {
  const { clearCart } = useContext(ShopContext);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();


  //useEffect to rerender after logout on home page
  // useEffect(() => {    
  //   setIsLoggedIn(false);
  // },[isLoggedIn] );

  const handleLogout = () => {
    clearCart();
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/")
    location.reload()
    
  };

  return (
    <div>
      <button onClick={handleLogout} className="nav-btn rounded">
        Logout
      </button>
    </div>
  );
}

export default Logout;
