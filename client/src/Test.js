import React, { useState } from 'react'

function Test() {

  const [Content, setContent] = useState("");
  const [ContentList, setContentList] = useState([]);

  const onSubmit = () => {
    let tempArr = [...ContentList];
    tempArr.push(Content);
    setContentList([...tempArr]);
    setContent("");
  };
  return (
    <div>
      {ContentList.map((content,idx) => {return <div key={idx}>{content}</div>;
      })}
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
}

export default Test