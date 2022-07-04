import React, {useState} from "react";
import { LoginDiv, MyPageDiv } from "../../Style/UserCSS.js";
function Register() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [PW, setPW] = useState("");
    const [PWConfirm, setPWConfirm] = useState("");
    const [Flag, setFlag] = useState(false);
    const [NameCheck, setNameCheck] = useState(false);
    const [NameInfo, setNameInfo] = useState("");
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
        <button >
          Register
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
