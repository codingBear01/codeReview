import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Please Enter Your Name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Please Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Please Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span className="errorMsg">
          Please enter another username or e-mail address
        </span>
      )}
    </div>
  );
}