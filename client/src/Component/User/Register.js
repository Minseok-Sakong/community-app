import React, { useState } from "react";
import { LoginDiv, MyPageDiv } from "../../Style/UserCSS.js";
import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  let navigate = useNavigate();
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("Please fill out all the prompts!");
      setFlag(false);
    }
    if (PW != PWConfirm) {
      return alert("Password does not match with Password Confirm!");
      setFlag(false);
    }
    if (PW.length < 8) {
      return alert("Password length must be longer than 7!");
      setFlag(false);
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
    });
    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        navigate("/login");
      } else {
        return alert("Registration failed");
      }
    });
  };
  return (
    <LoginDiv>
      <form>
        <label>Nickname</label>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={NameCheck}
        />
        {NameInfo}
        <button>Check Nickname</button>
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
          minLength={8}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <label>Password Confirm</label>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>
          Register
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
