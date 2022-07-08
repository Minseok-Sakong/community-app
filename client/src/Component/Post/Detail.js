import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { PostDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";
function Detail(props) {
  let navigate = useNavigate();
  let params = useParams();
  const user = useSelector((state) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("Post deleted");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1>{props.PostInfo.title}</h1>
        <h3>{props.PostInfo.author.displayName}</h3>
        {props.PostInfo.image ? (
          <img
            src={`http://localhost:5000/${props.PostInfo.image}`}
            alt=""
            style={{ width: "80%", height: "auto" }}
          />
        ) : null}
        <p>{props.PostInfo.content}</p>
      </Post>
      {user.uid === props.PostInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="edit">Edit</button>
          </Link>
          <button className="delete" onClick={() => DeleteHandler()}>
            Delete
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
}

export default Detail;
