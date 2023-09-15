import { NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <NavLink to="/" activeClassName="active">
          Shop
        </NavLink>
       
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Register</NavLink>
        <NavLink to="/logout">Log Out</NavLink>
        <NavLink
          to="/cart"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <ShoppingCart size={32} />
          </div>
          <div style={{ fontSize: "12px", marginTop: ''}}>Cart</div>
        </NavLink>
        <NavLink to="/cart/checkout">Checkout</NavLink>
      </div>
    </div>
  );
};
