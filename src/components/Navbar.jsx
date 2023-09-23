

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { ShoppingCart } from "phosphor-react";
import Logout from "../utils/logout/Logout";
import ProductSearch from "./ProductSearch";
import logoImage from "../../public/assests/logo.png";
import "./navbar.css";

export const Navbar = ({ products, setProducts, setSearch }) => {
  const username = localStorage.getItem("username");

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="ml-5 logo" />
      </div>
      <div>         
          <ProductSearch
            products={products}
            setProducts={setProducts}
            setSearch={setSearch}
          />
        </div>
      <div className="links">
      <div>
          {username ? <p className="welcome mr-3">Welcome, {username}</p> : null}
        </div>
        <NavLink to="/" activeClassName="active">
          Shop
        </NavLink>
        {!username && <NavLink to="/login">Login</NavLink>}

        {!username && <NavLink to="/signup" className={"register-link"}>Register</NavLink>}
       
       
        <div ><NavLink
          to="/cart"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
        
          <div >
            <ShoppingCart size={32} />
          </div>
          <div style={{ fontSize: "12px", float: "right"}}>Cart</div>
        </NavLink></div>
        
      </div>
      <div>{username ? <Logout /> : null}</div>
    </div>
  );
};

Navbar.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};
