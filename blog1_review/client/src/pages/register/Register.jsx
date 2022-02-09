import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  //you can use context api for register, but we are gonna store everything after login process.
  const [username, setUsername] = useState(""); //initial useState is empty
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent refresh the page when you click the submit btn
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      }); //create new user
      res.data && window.location.replace("/login"); //if you register successfully you will be redirected to login page
    } catch (err) {
      setError(true); //if there is an error setError is gonna be true
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form
        className="registerForm"
        onSubmit={handleSubmit} //submit this form
      >
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Please Enter Your Name"
          onChange={(e) => setUsername(e.target.value)} //whenever you change input value, it will be sent to DB
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Please Enter Your Email"
          onChange={(e) => setEmail(e.target.value)} //whenever you change input value, it will be sent to DB
        />

        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Please Enter Your Password"
          onChange={(e) => setPassword(e.target.value)} //whenever you change input value, it will be sent to DB
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
      {/*if "error" is ture this msg will be indicated */}
    </div>
  );
}
