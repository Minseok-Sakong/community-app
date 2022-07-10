import React, { useState,useEffect } from "react";
import { LoginDiv, MyPageDiv } from "../../Style/UserCSS.js";
import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      setFlag(false);
      return alert("Please fill out all the prompts!");
    }
    if (PW != PWConfirm) {
      setFlag(false);
      return alert("Password does not match with Password Confirm!");
    }
    if (PW.length < 8) {
      setFlag(false);
      return alert("Password length must be longer than 7!");
    }
    if (!NameCheck){
      return alert("Please check your nickname!");
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
  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!Name){
      return alert("Please choose your nickname");
    }
    let body = {
      displayName : Name,
    }
    axios.post("/api/user/namecheck", body).then((response)=> {
      if (response.data.success){
        if (response.data.check){
          setNameCheck(true);
          setNameInfo("You can use this nickname.");
        }else {
          setNameInfo("Please choose another nickname.")
        }
      }
    })
  }
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
        <button onClick={(e)=> NameCheckFunc(e)}>Check Nickname</button>
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
