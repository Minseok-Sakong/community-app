import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userSlice } from "../../Reducer/userSlice";

function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const user = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!Reple){
        return alert("Please fill out comment!");
    }

    let body = {
      reple: Reple,
      uid: user.uid,
      postId: props.postId,
    };
    axios.post("/api/reple/submit", body).then((response) => {
      if (response.data.success) {
        alert("Comment created!");
      } else {
        alert("Failed to create a comment!");
      }
    });
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={Reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
      </form>
      <button
        onClick={(e) => {
          SubmitHandler(e);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default RepleUpload;
