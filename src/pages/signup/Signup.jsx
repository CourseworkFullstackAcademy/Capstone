import { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../../utils/api";
import PropTypes from "prop-types";
import "./signup.css"

function Signup({ setId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  // eslint-disable-next-line no-unused-vars
 //const [ usernameAvailable, setUsernameAvailable ] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addUser({
        email: email,
        username: username,
        password: password,
      });
      if (response.id) {
        const id = response.id;
        setId(id);
        setRegistrationSuccessful(true);
      }
      console.log("New user added:", response);
      // Optionally, you can redirect the user after successful signup
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  //Password restrictions: 8 characters min, captial letter, lowercase letter, number, special character
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Event handler for password input
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.match(passwordPattern)) {
      setPassword(newPassword);
    }
  };

  // Event handler for confirm password input
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword === password) {
      setConfirmPassword(newConfirmPassword);
    }
  };

  // message appears that user was succesfully registered and to please log in

 return (
  <div>
    {registrationSuccessful ? ( // Conditional rendering based on registration success
      <div className="wrapper m-0 p-0">
        <div className="row"><div className="row-4 d-flex flex-column justify-content-center align-items-center ty"><p>Thank you for registering! </p></div>
        <div className="row-4 d-flex flex-column justify-content-center align-items-center login"><a href="/login">Please Login</a></div></div>
       
      </div>
    ) : (
      <div className="wrapper">
      <div className="center-container">
      <div className="title"><span><h2>Sign Up</h2></span></div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email"></label>
            <input
              type="email"
              autoComplete="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Password"
            />
          </div>
          <div>
            <p>
              For enhanced security, your password must have a minimum of 8
              characters, and include each of the following: 1 capital letter,
              1 lowercase letter, a number, and a special character (!,@,#, etc).
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        </div>
        <div>
          <h6>
            Already have an account? 
          </h6>
        </div>
        <div><Link to="/login">Log In</Link></div>
      </div>
      </div>
    )}
  </div>
);

}

Signup.propTypes = {
  setId: PropTypes.func.isRequired,
};

export default Signup;

