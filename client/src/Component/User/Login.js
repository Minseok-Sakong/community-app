import React, { useState } from "react";
import { LoginDiv, MyPageDiv } from "../../Style/UserCSS.js";
import {useNavigate} from "react-router-dom"

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  let navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();
  }

  return (
    <LoginDiv>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={PW}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <button onClick = {(e)=>SignInFunc()}>Login</button>
        <button onClick= {(e)=>{
            e.preventDefault();
            navigate("/register");
        }}>Register</button>
      </form>
    </LoginDiv>
  );
}

export default Login;
