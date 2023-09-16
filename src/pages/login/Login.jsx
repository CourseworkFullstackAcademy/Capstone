import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getCarts, getUsers } from "../../utils/api";


// eslint-disable-next-line react/prop-types
function Login({ setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
          localStorage.setItem("cart: ", userCart)
          console.log("User's Cart:", userCart);
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
    <div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <div><h5>Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link></h5></div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};