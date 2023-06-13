import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.css';
import DataLoginProvider from './context/DataLoginContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLoginProvider>
     <App />
    </DataLoginProvider>
  </React.StrictMode>
);
