import React from 'react'
import {useState, useEffect} from 'react'
import axios from "axios"
import {Button} from 'react-bootstrap'

const List = (props) => {
    // useEffect(() => {
    //     alert("Success");
    // })
    const [Text, setText] = useState("")

    useEffect(() => {
        let body = {
            text : "Hello",
        }
        axios
        .post('/api/test', body)
        .then((response) =>{
            console.log(response.data);
            setText(response.data.text)

        })
        .catch((error) => {
            console.log(error);

    });
    }, [])
    
    return (
        <div>
            <h1>
                List!
                <h3>{Text}</h3>
            </h1>
      {props.ContentList.map((content,idx) => {return <div key={idx}>{content}</div>;
      })}
    </div>
    );
};

export default List;