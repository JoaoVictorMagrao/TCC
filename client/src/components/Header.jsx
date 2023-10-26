import React, {useContext} from "react";
import logo from '../img/logo.svg';
import {useAuthUser} from 'react-auth-kit';
import { BiPowerOff } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
// import { DataLoginContext } from "../context/DataLoginContext";
import { useNavigate } from 'react-router-dom';

function Header({ titleHeader }) {
  // const { nameUser } = useContext(DataLoginContext)
  // const teacherName = sessionStorage.getItem('userName');
  const navigate = useNavigate();
  const auth = useAuthUser();

  const irParaHome = (event) => {
    navigate('/home');
  };
 
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-blue-500 border-b border-gray-300 shadow-md">
    {/* <img src={logo} alt="Logo" className="h-15 cursor-pointer" onClick={irParaHome}/> */}
    <IoArrowBackOutline size={32} className="h-15 cursor-pointer text-white" onClick={irParaHome} />
    <h1 className="text-white font-bold text-2xl mx-auto">{titleHeader}</h1>
   
  </header>
  );
}

export default Header;
