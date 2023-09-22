import { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getCarts, getUsers } from "../../utils/api";
import { updateCartItems } from "../../utils/localStorageCart";
import './login.css';


// eslint-disable-next-line react/prop-types
function Login({ setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //should I use useConext(ShopContext) below somemhow? 
  const {setCartItems} = useContext(ShopContext);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchUserCart = async () => {
    try {
      // Fetch all users
      const userData = await getUsers();
      const user = userData.find((user) => user.username === username);
  
      // Find the cart that belongs to the user who just logged in
      if (user) {
        // User found, get their ID
        const userId = user.id;
  
        // Fetch all carts
        const cartsData = await getCarts();
        console.log(`Cart Data: `, cartsData);
  
        // Find the cart that belongs to the user who just logged in
        const userCart = cartsData.find((cart) => cart.userId === userId);
         
        if (userCart) {
          // Initialize an empty cart object
        const updatedCart = {};

        // Loop through the products array in userCart
        userCart.products.forEach((productItem) => {
          const productId = productItem.productId;
          const quantity = productItem.quantity;
          
          // Add the product to the updatedCart
          updatedCart[productId] = quantity;
          // console.log([productId]);
          // console.log([quantity]);
          console.log("updated cart", updatedCart)
        });

        // Set the updated cart to the state and local storage
        setCartItems(updatedCart);
        updateCartItems(updatedCart);
       


          //uncomment out below if adding cart from api does not work
          //stringify data from api in order to save it to the local storage
          // localStorage.setItem("cart: ", JSON.stringify(userCart))
          console.log("User's Cart from api:", userCart);
        } else {
          console.log(`${username}'s Cart not found.`);
        }
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error('Error fetching user data or carts:', error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);

    if (response.token) {
      const token = response.token;
      setToken(token);    
      localStorage.setItem("accessToken", token)
      localStorage.setItem("username", username)
      fetchUserCart();
      localStorage.getItem("userCart", )
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  } catch (err) {
    setError("An error occurred while logging in.");
    console.error(err);
  }
};



  return (
    <div className="wrapper">
    <div className="center-container">
      <div className="title"><span><h2>Login</h2></span></div>
      {error && <p className="error">{error}</p>}
      <div className="form">
        <form onSubmit={handleSubmit}>
          <i className="username-icon"></i>
          <div className="form-input">
            <label htmlFor="username"></label>
            <input
              type="text"
              autoComplete="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="form-input">
          <i className="password-icon"></i>
            <label htmlFor="password"></label>
            <input
              type="password"
              autoComplete="current-password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submit-btn">Log In</button>
        </form>
      </div>
      <div className="new-acct">
        <div><h6>New to eCommerce App?</h6></div>
        <div><Link to="/signup">Create your eCommerce App account</Link></div>
      </div>
    </div>
  </div>
    
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};