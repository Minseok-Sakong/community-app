import React, { useState, useEffect } from "react";
import { LoginDiv, MyPageDiv } from "../../Style/UserCSS.js";
import { useNavigate } from "react-router-dom";

import firebase from "../../firebase.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      return alert("Please fill out both Email and Password!");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("Wrong email");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Wrong password");
      } else {
        setErrorMsg("Log-in failed");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [ErrorMsg]);

  return (
    <LoginDiv>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={Email}
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={PW}
          required
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        {ErrorMsg != "" && <p>{ErrorMsg}</p>}
        <button onClick={(e) => SignInFunc(e)}>Login</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Register
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
