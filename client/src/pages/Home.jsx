import '../styles/login.css';

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import {useAuthUser} from 'react-auth-kit';
import { fetchAlunos, excluirAluno } from '../services/StudentsServices.js';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// import { DataLoginContext } from "../context/DataLoginContext";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import DrawerLeft from '../components/DrawerLeft';



//import Swal from 'sweetalert2';
export let valorBotao = 'Editar Aluno';


function Home() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [filtroSituacao, setFiltroSituacao] = useState('0');
  const [filtroNome, setFiltroNome] = useState('');
  const Swal = require('sweetalert2');
  // const { idTeacher } = useContext(DataLoginContext);
  //const [cadastrarAluno, setCadastrarAluno] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToShow = data.slice(startIndex, endIndex);

  const navigate = useNavigate()

  const auth = useAuthUser();

  useEffect(() => {
     fetchAlunos(auth().id, setData);
  }, [])


  const handleButtonEditarAluno = async (alunoId) => {
      window.location.href = `/cliente?id=${alunoId}`;
  };

  const confirmDeleteAluno = async (alunoId, nome) => {
    Swal.fire({
      title: `Tem certeza de que deseja excluir permanentemente o aluno ${nome}?`,
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
          handleButtonExcluirAluno(alunoId)
      }
    })
  }

/*---------------------- EXCLUIR ALUNO ----------------------*/

  const handleButtonExcluirAluno = async (alunoId) => {
    try {
      const response = await excluirAluno(alunoId);

      // Exclusão bem-sucedida
      Swal.fire({
        icon: 'success',
        title: 'Feito',
        text: 'Aluno excluído com sucesso!',
        showConfirmButton: false,
        timer: 2000,
      });

      fetchAlunos(auth().id, setData); 
    } catch (error) {
      // Lidar com erros de exclusão
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao excluir o aluno!',
      });
    }
  };

/*---------------------- FIM EXCLUIR ALUNO ----------------------*/
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
  
  return (
   //   Hello {auth().nome}
    <div>
        <DrawerLeft nome={auth().nome}/>
     
      <div className="flex flex-col w-4/5 mx-auto overflow-x-auto lg:overflow-x-hidden mt-4">   
          <div class="flex flex-col overflow-x-auto w-4/5 mx-auto">
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
                      <th scope='col' className='px-6 py-4'>

                      </th>
                      <th scope='col' className='px-6 py-4'>
                        
                        </th>
                        <th scope='col' className='px-6 py-4'>
                        
                      </th>
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
                      <tr className='border-b dark:border-neutral-500 cursor-pointer' key={row.id} >
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
                        <td>
                            <Tooltip arrow TransitionComponent={Zoom} title="Editar">
                              <Link to={`/cliente/${row.id}`} onClick={() => handleButtonEditarAluno(row.id)}>
                                <div className='flex items-center justify-center'>
                                  <BiEdit size={32} />
                                </div>
                              </Link>
                            </Tooltip>
                        </td>

                        <td>
                            <Tooltip arrow TransitionComponent={Zoom} title="Deletar">
                              <div className='flex items-center justify-center'>
                                <AiFillDelete size={32} onClick={() => confirmDeleteAluno(row.id, row.nome)} className='cursor-pointer'/>   
                              </div>
                            </Tooltip>
                        </td>

                        <td>
                            <Tooltip arrow TransitionComponent={Zoom} title="Montar Treino">
                              <div className='flex items-center justify-center'>
                                <CgGym size={32} onClick={() => navigate(`/treino/${row.id}`)}/>   
                              </div>
                            </Tooltip>
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
      </div>

  )
  
}

export default Home
