import React from 'react';
import logo from '../img/logo.svg';
import { professorNome } from '../pages/Login';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  
  const irParaHome = (event) => {
    navigate('/home');
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-300">
    <img src={logo} alt="Logo" className="h-15" onClick={irParaHome}/>

    <h1 className="text-black font-bold text-xl">{professorNome}</h1>
  </header>
  );
}

export default Header;
