import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";
import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import { useSelector, useDispatch } from 'react-redux'
import {loginUser, clearUser} from "./Reducer/userSlice.js"
import firebase from "./firebase.js";
/*
1. A component name must start with Capital letters.
2. A component must be exported, so that other component can use it.
3. Don't forget to import the component you want to use.
*/
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo)=>{
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, [])

  
  
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
