import React, {useContext} from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { DataLoginContext } from "./context/DataLoginContext";

function App() {
  const { nameUser, idUser } = useContext(DataLoginContext)
  // console.log(nameUser);
  // console.log(idUser);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
