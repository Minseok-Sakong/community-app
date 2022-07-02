import logo from './logo.svg';
import './App.css';
import Test from './Test';
import {
  Routes,
  Route,
} from "react-router-dom";
import Heading from './Component/Heading';
import List from './Component/List';
import Upload from './Component/Upload';
import { useState } from 'react';
/*
1. A component name must start with Capital letters.
2. A component must be exported, so that other component can use it.
3. Don't forget to import the component you want to use.
*/
function App() {
  const [ContentList, setContentList] = useState([]);
  return (
    <>
    <Heading/>
    <Routes>
      <Route path="/list" 
      element={<List ContentList={ContentList} setContentList = {setContentList}/>} />
      <Route path="/upload" 
      element={<Upload ContentList={ContentList} setContentList = {setContentList}/>} />
    </Routes>
    </>
  );
}

export default App;
