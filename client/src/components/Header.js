import React, {useContext} from "react";
import logo from '../img/logo.svg';
import {useAuthUser, useSignOut} from 'react-auth-kit';
import { BiPowerOff } from 'react-icons/bi';
// import { DataLoginContext } from "../context/DataLoginContext";
import { useNavigate } from 'react-router-dom';

function Header() {
  // const { nameUser } = useContext(DataLoginContext)
  // const teacherName = sessionStorage.getItem('userName');
  const navigate = useNavigate();
  const auth = useAuthUser();
  const signOut = useSignOut();
  const irParaHome = (event) => {
    navigate('/home');
  };
  function logout(){
    signOut();
  }
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-300 shadow-md">
    <img src={logo} alt="Logo" className="h-15 cursor-pointer" onClick={irParaHome}/>
    
    <h1 className="text-black font-bold text-2xl">{auth().nome}</h1>
    <div className="flex items-center flex-col cursor-pointer" onClick={() => logout()}>
      <BiPowerOff/>
    </div>
  </header>
  );
}

export default Header;
