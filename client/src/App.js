import React, {useContext} from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { DataLoginContext } from "./context/DataLoginContext";

function App() {
  const { nameTeacher, idTeacher } = useContext(DataLoginContext)
  // console.log(nameTeacher);
  // console.log(idTeacher);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
