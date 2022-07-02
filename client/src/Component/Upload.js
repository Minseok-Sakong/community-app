import React from 'react';
import { useState, useEffect } from 'react'

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
        <div>
        <input type="text" 
      value={Content} 
      onChange={(e)=> {
        setContent(e.currentTarget.value);
      }}
      />
      <button onClick={() => {
        onSubmit();
      }}>Submit</button>
        </div>
    );
};

export default Upload;