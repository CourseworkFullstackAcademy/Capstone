
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import Logout from "../utils/logout/Logout";
import "./navbar.css";

// eslint-disable-next-line react/prop-types
export const Navbar = () => {


const username = localStorage.getItem("username");


    return (
    <div className="navbar">
      <div>
        {/* when below is "setIsLoggedin ? (", the Welcome renders without the username. but, when it is usernameMessage, the welcome username does not render until you refresh the page */}
        {username ? (
          <p className="welcome">Welcome, {username}</p>
        ): null}
      </div>
      <div className="links">
        <NavLink to="/" activeClassName="active">
          Shop
        </NavLink>
        {!username && <NavLink to="/login">Login</NavLink>}
       
        {!username && <NavLink to="/signup">Register</NavLink>}

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
          <div style={{ fontSize: "12px", marginTop: "" }}>Cart</div>
        </NavLink>
      </div>
      <div>
      {username ? <Logout /> : null}
      </div>
    </div>
  );
};
