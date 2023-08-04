import React, {useContext} from "react";
import logo from '../img/logo.svg';
import {useAuthUser} from 'react-auth-kit';
import { BiPowerOff } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
// import { DataLoginContext } from "../context/DataLoginContext";
import { useNavigate } from 'react-router-dom';

function Header() {
  // const { nameUser } = useContext(DataLoginContext)
  // const teacherName = sessionStorage.getItem('userName');
  const navigate = useNavigate();
  const auth = useAuthUser();

  const irParaHome = (event) => {
    navigate('/home');
  };
 
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-300 shadow-md">
    {/* <img src={logo} alt="Logo" className="h-15 cursor-pointer" onClick={irParaHome}/> */}
    <IoArrowBackOutline size={32} className="h-15 cursor-pointer" onClick={irParaHome} />
    {/* <h1 className="text-black font-bold text-2xl">{auth().nome}</h1> */}
   
  </header>
  );
}

export default Header;
