import '../styles/login.css';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { professorId} from './Login';


function Home() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [filtroSituacao, setFiltroSituacao] = useState('0');
  const [filtroNome, setFiltroNome] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get('http://localhost:3001/listaAlunos')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }, [])

  const handleFiltroSituacaoChange = (event) => {
    setFiltroSituacao(event.target.value);
  };

  const handleFiltroNomeChange = (event) => {
    setFiltroNome(event.target.value);
  };

  const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          ul: {
            justifyContent: 'center',
            margin: '20px 0',
          },
        },
      },
    },
  });

  const cliqueCadastrarAluno = (values) => {
    navigate('/cliente')
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToShow = data.slice(startIndex, endIndex);

  
  return (
    <div>
      <Header />
      <div className='mt-2 text-right mr-3'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={cliqueCadastrarAluno}
        >   <i class="fa-solid fa-plus mr-2"></i>
           Cadastrar Aluno
        </button>
      </div>

     
      <div className='flex flex-col overflow-x-auto w-4/5 mx-auto'>
      <div className='flex justify-end'>
        <div className="flex flex-col">
          <label htmlFor="filtroSituacao"> Situação</label>
          <select  id='filtroSituacao'
            name='filtroSituacao'
            className='border text-sm rounded-lg block w-full p-2.5'
            value={filtroSituacao}
            onChange={handleFiltroSituacaoChange}>
            <option value="0">Todos</option>
            <option value="1">Ativos</option>
            <option value="2">Inativos</option>
          </select>            
        </div>

        <div className="ml-4 w-80">
          <label htmlFor="filtroNome"> Pesquisar por nome</label>
          <input type="text"
          name='filtroNome'
          id='filtroNome'
          className='border text-sm rounded-lg block w-full p-2.5'
          value={filtroNome}
          onChange={handleFiltroNomeChange}/>
        </div>
      </div>
        <div className='sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th scope='col' className='px-6 py-4'>
                      Código
                    </th>
                    <th scope='col' className='px-6 py-4'>
                      Nome
                    </th>
                    <th scope='col' className='px-6 py-4'>
                      Vr. Mensal
                    </th>
                    <th scope='col' className='px-6 py-4'>
                      Data Vencimento
                    </th>
                    <th scope='col' className='px-6 py-4'>
                      Telefone
                    </th>
                    <th scope='col' className='px-6 py-4'>
                      Situação
                    </th>
                    <th scope='col' className='px-6 py-4'></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Filtro para buscar por nome e por situação */}
                {usersToShow.filter((row) => {
                  const situacaoFiltrada =
                    filtroSituacao === '1'
                      ? row.ativo === 1
                      : filtroSituacao === '2'
                      ? row.ativo !== 1
                      : true;

                  const nomeFiltrado =
                    filtroNome.trim() === '' ||
                    row.nome.toLowerCase().includes(filtroNome.toLowerCase());

                  return situacaoFiltrada && nomeFiltrado;
                })
                .map((row) => (
                    <tr className='border-b dark:border-neutral-500' key={row.id}>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>{row.id}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{row.nome}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        {row.valor_mensal.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        {new Date(row.data_vencimento).toLocaleDateString('pt-BR')}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>{row.whatsapp_formatado}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <span
                          className={
                            row.ativo === 1
                              ? 'bg-green-500 rounded-full inline-block w-3 h-3 mr-2'
                              : 'bg-red-500 rounded-full inline-block w-3 h-3 mr-2'
                          }
                        ></span>
                        {row.ativo === 1 ? 'Ativo' : 'Inativo'}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <BiEdit size={32} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ThemeProvider theme={theme}>
                <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
