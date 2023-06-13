import React, {createContext, useState} from 'react';

export const DataLoginContext = createContext();

function DataLoginProvider ({children}) {
const [nameUser, setNameUser] = useState('');
const [idUser, setIdUser] = useState('');

  return(
    <DataLoginContext.Provider value={{nameUser, setNameUser, idUser, setIdUser}}>
     {children}
    </DataLoginContext.Provider>
  )
}
export default DataLoginProvider