import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

function Logout() {
 const { clearCart } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleLogout = () => {
   clearCart();
   localStorage.clear();
   navigate("/");
  

  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
