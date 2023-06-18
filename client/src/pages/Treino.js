import React from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

function Treino(){
  const { codigo, nome } = useParams();
  return(
    <div>
      <Header />
      <h1 className='text-center mt-10 font-bold text-2xl'> {nome} </h1>
    </div>
  )
}

export default Treino