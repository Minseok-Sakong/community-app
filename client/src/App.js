import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";
import { Routes, Route } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";
/*
1. A component name must start with Capital letters.
2. A component must be exported, so that other component can use it.
3. Don't forget to import the component you want to use.
*/
function App() {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
