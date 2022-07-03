import React from 'react';
import { useState, useEffect } from 'react'
import {UploadDiv, UploadForm, UploadButtonDiv} from "../Style/UploadCss.js"

const Upload = (props) => {
    const [Content, setContent] = useState("");
  
    const onSubmit = () => {
      let tempArr = [...props.ContentList];
      tempArr.push(Content);
      props.setContentList([...tempArr]);
      setContent("");
    };
    useEffect(() => {
        console.log("Content changed!")
    }, [Content]);
    
    return (
        <UploadDiv>
          <UploadForm>
            <label htmlFor=''>Title</label>
          <input
          id='title'
          type="text" 
      value={Content} 
      onChange={(e)=> {
        setContent(e.currentTarget.value);
      }}
      />
      <label htmlFor=''>Content</label>
          <textarea/>
      <UploadButtonDiv> 
      <button
      onClick={() => {
        onSubmit();
      }}>Submit
      </button>
      </UploadButtonDiv>
          </UploadForm>
        </UploadDiv>
    );
};

export default Upload;