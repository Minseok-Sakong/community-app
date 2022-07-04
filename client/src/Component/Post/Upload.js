import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCss.js";
import axios from 'axios';
import ImageUpload from "./ImageUpload.js"

const Upload = () => {
  let navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("Please fill out both the title and the content!");
    }
    let body = {
      title: Title,
      content: Content,
      image: Image,
    }
    axios.post("/api/post/submit", body).then((response) => {
      if (response.data.success){
        alert("Successfully created the post");
        navigate("/");
      }else {
        alert("Failed to create the post");
      }
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
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
        <ImageUpload setImage={setImage}/>
        <label htmlFor="">Content</label>
        <textarea
          value={Content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
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
};

export default Upload;
