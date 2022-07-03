import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../Style/UploadCss.js";

function Edit() {
  let params = useParams();
  let navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
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
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
  }, [PostInfo]);


  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("Please fill out both the title and the content!");
    }
    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
    };
    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("Successfully edited the post");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("Failed to edit the post");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return(
  <UploadDiv>
    <UploadForm>
      <label htmlFor="">Title</label>
      <input
        id="title"
        type="text"
        value={Title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <label htmlFor="">Content</label>
      <textarea
        value={Content}
        onChange={(e) => {
          setContent(e.currentTarget.value);
        }}
      />
      <UploadButtonDiv>
      <button className="cancel"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Submit
        </button>
      </UploadButtonDiv>
    </UploadForm>
  </UploadDiv>
  );
}

export default Edit;
