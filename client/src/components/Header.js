import React from 'react';
import logo from '../img/logo.svg';

function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-300">
    <img src={logo} alt="Logo" className="h-15" />

    <h1 className="text-black font-bold text-xl">Nome do Treinador</h1>
  </header>
  );
}

export default Header;
