import React, {useContext} from "react";
import logo from '../img/logo.svg';
import { DataLoginContext } from "../context/DataLoginContext";
import { useNavigate } from 'react-router-dom';

function Header() {
  const { nameUser } = useContext(DataLoginContext)
  const navigate = useNavigate();
  
  const irParaHome = (event) => {
    navigate('/home');
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-300 shadow-md">
    <img src={logo} alt="Logo" className="h-15 cursor-pointer" onClick={irParaHome}/>
    
    <h1 className="text-black font-bold text-2xl">{nameUser}</h1>
  </header>
  );
}

export default Header;
