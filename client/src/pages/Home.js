import "../styles/login.css";
import Header from '../components/Header';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Home() { 
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/listaAlunos")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
 
  const cliqueCadastrarAluno = (values) => {
    navigate('/cliente');
  }
  return (
    <div>
      <Header />
      <div className="mt-2 text-right mr-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={cliqueCadastrarAluno}> Cadastrar Aluno </button>
      </div>
      <div className="flex flex-col overflow-x-auto w-4/5 mx-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr >
                    <th scope="col" className="px-6 py-4">
                      Código
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Vr. Mensal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Data Vencimento
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Telefone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Situação
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr className="border-b dark:border-neutral-500" key={row.id}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {row.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {row.nome}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                      {row.valor_mensal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                      {new Date(row.data_vencimento).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {row.whatsapp}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                      <span className={row.ativo === 1 ? 'bg-green-500 rounded-full inline-block w-3 h-3 mr-2' : 'bg-red-500 rounded-full inline-block w-3 h-3 mr-2'}></span>
                        {row.ativo === 1 ? 'Ativo' : 'Inativo' }
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <BiEdit size={32}/>         
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;