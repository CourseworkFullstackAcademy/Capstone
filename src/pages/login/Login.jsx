import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";


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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);
console.log("response.token", response)

    if (response.token) {
      const token = response.token;
      setToken(token);
      //saveTokenSessionStorage(token);      
      localStorage.setItem("accessToken", token)
      localStorage.setItem("username", username)
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
      <div><h5>Don&apos;t have an account yet? <a href="/signup">Sign Up</a></h5></div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};