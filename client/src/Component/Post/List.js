import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import { ListDiv, ListItem } from "../../Style/ListCSS.js";

const List = (props) => {
  const [PostList, setPostList] = useState([]);
  // useEffect(() => {
  //     alert(pw);
  // })

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ListDiv>
      {PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
            <p className="title"> {post.title}</p>
            <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
