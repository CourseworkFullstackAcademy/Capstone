import { useState } from "react";
import { addUser } from "../../utils/api";
import PropTypes from "prop-types";

function Signup({ setId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ usernameAvailable, setUsernameAvailable ] = useState("")

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
      <div>
        <p>Thank you for registering! Please</p>
        <a href="/login">Login</a>
      </div>
    ) : (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <p>
              For enhanced security, your password must have a minimum of 8
              characters, and include each of the following: 1 capital letter,
              1 lowercase letter, a number, and a special character (!,@,#, etc).
            </p>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <div>
          <h5>
            Already have an account? <a href="/login">Log in</a>
          </h5>
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

