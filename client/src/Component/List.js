import React from 'react'
import { useState } from 'react'

const List = (props) => {

    return (
        <div>
            <h1>
                List!
            </h1>
      {props.ContentList.map((content,idx) => {return <div key={idx}>{content}</div>;
      })}

    </div>
    );
};

export default List;