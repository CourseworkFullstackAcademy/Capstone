import { NavLink } from "react-router-dom";
import { ShoppingCart } from 'phosphor-react';
import "./navbar.css"

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <NavLink exact to="/" activeClassName="active">Shop</NavLink>
                <NavLink to="/cart"><ShoppingCart size={32} /></NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Register</NavLink>
                <NavLink to="/logout">Log Out</NavLink>
                <NavLink to="/cart/checkout">Checkout</NavLink>
            </div>
        </div>
    );
}













