import React, {createContext, useState} from 'react';

export const DataLoginContext = createContext();

function DataLoginProvider ({children}) {
const [nameTeacher, setNameTeacher] = useState('');
const [idTeacher, setIdTeacher] = useState('');

  return(
    <DataLoginContext.Provider value={{nameTeacher, setNameTeacher, idTeacher, setIdTeacher}}>
     {children}
    </DataLoginContext.Provider>
  )
}
export default DataLoginProvider