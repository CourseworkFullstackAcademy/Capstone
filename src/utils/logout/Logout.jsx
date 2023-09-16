import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

function Logout() {
 const { clearCart } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleLogout = () => {
   clearCart();
   localStorage.removeItem("username"); 
  localStorage.removeItem("accessToken"); 
   navigate("/");
  //cart does not rerender as empty after logout, the cart is cleared, but the user has to refresh the page to render an empty cart after logout

  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
