import { useState } from "react";
import { addUser } from "../../utils/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addUser({
        email: email,
        username: username,
        password: password,
      });

      console.log("New user added:", response);
      // Optionally, you can redirect the user after successful signup
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

//Password restrictions: 8 characters min, captial letter, lowercase letter, number, special character
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Event handler for password input
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword)
    if (newPassword.match(passwordPattern)) {
      setPassword(newPassword);
      console.log("Does password have blah")
    }
  };

  // Event handler for confirm password input
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword)
    if (newConfirmPassword === password) {
      setConfirmPassword(newConfirmPassword);
    }
  };

  return (
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
    </div>
  );
}

export default Signup;
