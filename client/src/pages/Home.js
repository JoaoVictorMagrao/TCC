import '../styles/login.css';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


export let valorBotao = 'Editar Aluno';

function Home() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [filtroSituacao, setFiltroSituacao] = useState('0');
  const [filtroNome, setFiltroNome] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const Swal = require('sweetalert2');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const usersToShow = filteredData.slice(startIndex, endIndex);
  //const [cadastrarAluno, setCadastrarAluno] = useState(false);

  

  const navigate = useNavigate()
  useEffect(() => {
    fetchAlunos();
  }, [])


  const fetchAlunos = () => {
    Axios.get('http://localhost:3001/listaAlunos')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  const handleButtonEditarAluno = async (alunoId) => {
    try {
      const response = await fetch(`http://localhost:3001/listaAlunoUnico/${alunoId}`);
      const data = await response.json();
  
      // Redirecionar para a página desejada e passar os dados como parâmetros na URL
      const dados = `id=${data.id}&nome=${data.nome}&email=${data.email}&telefone=${data.whatsapp}&valor_mensal=${data.valor_mensal}&data_vencimento=${data.data_vencimento}&situacao=${data.ativo}&senha=${data.senha}&cpf=${data.cpf}`
      window.location.href = '/cliente?' + dados;

    } catch (error) {
      console.error(error);
    }
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

  const handleButtonExcluirAluno = async (alunoId) => {
    try {
      const response = await fetch(`http://localhost:3001/excluirAluno/${alunoId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        // Exclusão bem-sucedida
        Swal.fire({
          icon: 'success',
          title: 'Atenção',
          text: 'Aluno excluido com sucesso!',
          showConfirmButton: false,
          timer: 2000
          //footer: '<a href="">Why do I have this issue?</a>'
        })
        fetchAlunos();
      } else {
        // Lidar com erros de exclusão
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao excluir o aluno!'
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    } catch (error) {
      // Lidar com erros de requisição
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro na requisição:', error
        //footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  const handleFiltroSituacaoChange = (event) => {
    const situacao = event.target.value;
    setFiltroSituacao(situacao);
  
    const filteredRows = data.filter((row) => {
      const situacaoFiltrada =
        situacao === '1' ? row.ativo === 1 : situacao === '2' ? row.ativo !== 1 : true;
  
      const nomeFiltrado =
        filtroNome.trim() === '' ||
        row.nome.toLowerCase().includes(filtroNome.toLowerCase());
  
      return situacaoFiltrada && nomeFiltrado;
    });
  
    setFilteredData(filteredRows);
  };

  const handleFiltroNomeChange = (event) => {
    const nome = event.target.value;
    setFiltroNome(nome);
  
    const filteredRows = data.filter((row) => {
      const situacaoFiltrada =
        filtroSituacao === '1' ? row.ativo === 1 : filtroSituacao === '2' ? row.ativo !== 1 : true;
  
      const nomeFiltrado = nome.trim() === '' || row.nome.toLowerCase().includes(nome.toLowerCase());
  
      return situacaoFiltrada && nomeFiltrado;
    });
  
    setFilteredData(filteredRows);
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
    //setCadastrarAluno(true);
    valorBotao = 'Cadastrar Aluno';
    navigate('/cliente');
  }

  return (
  
    <div>
      <Header />
      <div className='mt-2 text-right mr-3'>
    
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={cliqueCadastrarAluno}
          >   <i className="fa-solid fa-plus mr-2"></i>
            Cadastrar Aluno
          </button>

      </div>

     
      <div className="flex flex-col w-4/5 mx-auto overflow-x-auto lg:overflow-x-hidden">
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
                {usersToShow
                .filter((row) => {
                  const situacaoFiltrada =
                    filtroSituacao === '1'
                      ? row.ativo === 1
                      : filtroSituacao === '2'
                      ? row.ativo !== 1
                      : true;

                  const nomeFiltrado =
                    filtroNome.trim() === '' ||
                    row.nome.toLowerCase().includes(filtroNome.toLowerCase());

                  // Verifica se o filtro de nome está vazio ou se o nome corresponde ao filtro
                  const filtroNomeVazioOuCorrespondente = filtroNome.trim() === '' || nomeFiltrado;

                  return situacaoFiltrada && filtroNomeVazioOuCorrespondente;
                }).map((row) => (
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
                      <td className='whitespace-nowrap px-6 py-4 flex gap-10'>
                        <Link to={`/cliente/${row.id}`} onClick={() => handleButtonEditarAluno(row.id)}>
                          <BiEdit size={32} />
                        </Link>
                        <AiFillDelete size={32} onClick={() => confirmDeleteAluno(row.id, row.nome)} className='cursor-pointer'/>
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
