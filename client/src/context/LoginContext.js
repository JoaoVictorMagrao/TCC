import { createContext, useState } from "react";

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {

  const [login, setLogin] = useState("");
  return <LoginContext.Provider>{children}</LoginContext.Provider>
}

export default LoginContext;