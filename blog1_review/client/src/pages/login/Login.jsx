import axios from "axios"; //import axios
import { useContext, useRef } from "react"; //import useContext, useRef function
import { Link } from "react-router-dom";
import { Context } from "../../context/Context"; //import Context.js in context folder
import "./login.css";

export default function Login() {
  const userRef = useRef();
  /*
(alias) useRef<undefined>(): React.MutableRefObject<undefined> (+2 overloads)
import useRef

useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

Note that useRef() is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.
  */
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context); //const Context in Context.js

  const handleSubmit = async (e) => {
    //make requests to api
    e.preventDefault(); //to prevent refresh this page
    dispatch({
      type: "LOGIN_START", //this is action type
    });
    try {
      const res = await axios.post("/auth/login", {
        //pass the data
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>

      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="username"
          placeholder="Please Enter Your Username"
          ref={userRef} //indicate reference
        />

        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Please Enter Your Password"
          ref={passwordRef}
        />

        <button className="loginButton" type="submit" disabled={isFetching}>
          {/*if you already login cursor would be not-allowed */}
          Login
        </button>
      </form>

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
