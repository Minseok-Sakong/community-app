import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";


import {
  PostDiv,
  Post,
  BtnDiv,
  SpinnerDiv,
} from "../../Style/PostDetailCSS.js";
function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

  return (
    <PostDiv>
      {Flag ? (
        <>
        <Post>
          <h1>{PostInfo.title}</h1>
          <p>{PostInfo.content}</p>
        </Post>
        <BtnDiv>
            <Link to= {`/edit/${PostInfo.postNum}`}>
            <button className="edit">Edit</button>
            </Link>
            <button className="delete">Delete</button>
        </BtnDiv>
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>{" "}
          </Spinner>
        </SpinnerDiv>
      )}
    </PostDiv>
  );
}

export default Detail;
