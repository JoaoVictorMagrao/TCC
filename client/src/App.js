import React, {useContext} from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AuthProvider } from 'react-auth-kit';

function App() {
  return (
    <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
