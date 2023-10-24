import '../styles/login.css';

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import {useAuthUser} from 'react-auth-kit';
import { fetchAlunos, excluirAluno, fetchStudentsPrinter, searchStudentTraining } from '../services/StudentsServices.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Stack, Button} from '@mui/material';
import { BiEdit } from 'react-icons/bi';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { AiFillDelete } from 'react-icons/ai';
import { formatarData } from '../Util/util.js';
import { CgGym } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
// import { DataLoginContext } from "../context/DataLoginContext";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import DrawerLeft from '../components/DrawerLeft';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import alunosPDF from '../Reports/Alunos/alunos';
import treinoPDF from '../Reports/Treino/treino';
//import Swal from 'sweetalert2';
export let valorBotao = 'Editar Aluno';


function Home() {
  const [filtroSituacao, setFiltroSituacao] = useState('0');
  const [filtroNome, setFiltroNome] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [loading, setLoading] = useState(true);
  const [openModalPrinter, setOpenModalPrinter] = React.useState(false);

  const Swal = require('sweetalert2');
  // const { idTeacher } = useContext(DataLoginContext);
  //const [cadastrarAluno, setCadastrarAluno] = useState(false);

  const handlePrinter = async  () => {

    const data = await fetchStudentsPrinter(auth().id, filtroSituacao);
    alunosPDF(data.data);
    setLoading(false);
  };

  const handleTrainingPrinter = async  (fichaAtivo) => {
    const data = await searchStudentTraining(fichaAtivo);
    treinoPDF(data);
    setLoading(false);
  };

  const navigate = useNavigate()

  const auth = useAuthUser();

  useEffect(() => {
     fetchAlunos(auth().id, 2, setStudents);
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

      fetchAlunos(auth().id, setStudents); 
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
    fetchAlunos(auth().id, event.target.value, setStudents);
    setFiltroSituacao(event.target.value);
  };

  const handleFiltroNomeChange = (event) => {
    setFiltroNome(event.target.value);
  };

  const handleClickOpenModalPrinter = () => {
    setOpenModalPrinter(true);
  };

  const handleClickCloseModalPrinter = () => {
    setOpenModalPrinter(false);
  };
 
  return (
   //   Hello {auth().nome}
    <div>
        <DrawerLeft nome={auth().nome}/>

        <Dialog open={openModalPrinter} onClose={handleClickCloseModalPrinter}>
          <DialogTitle>Filtro - Impressão</DialogTitle>
            <DialogContent>
                    <label htmlFor="filtroSituacao"> Situação</label>
                    <select  id='filtroSituacao'
                      name='filtroSituacao'
                      className='border text-sm rounded-lg block w-full p-2.5'
                      value={filtroSituacao}
                      onChange={handleFiltroSituacaoChange}>
                      <option value="2">Todos</option>
                      <option value="1">Ativos</option>
                      <option value="0">Inativos</option>
                    </select>            

            </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseModalPrinter}>Cancelar</Button>
            <Button onClick={handlePrinter}>Imprimir</Button>
          </DialogActions>
      </Dialog>
     
      <div className="flex flex-col w-4/5 mx-auto overflow-x-auto lg:overflow-x-hidden mt-4">   
          <div class="flex flex-col overflow-x-auto w-4/5 mx-auto">
              <div className='flex'>
                  <div className="flex flex-col">
                    <label htmlFor="filtroSituacao"> Situação</label>
                    <select  id='filtroSituacao'
                      name='filtroSituacao'
                      className='border text-sm rounded-lg block w-full p-2.5'
                      value={filtroSituacao}
                      onChange={handleFiltroSituacaoChange}>
                      <option value="2">Todos</option>
                      <option value="1">Ativos</option>
                      <option value="0">Inativos</option>
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

              <div className='flex justify-end'>
                    <Stack spacing={2} direction="row" className='float-right mb-2'> 
                      <Button onClick={handleClickOpenModalPrinter} variant="contained"><span className='mr-1'><WysiwygIcon /> </span> Imprimir</Button>
                    </Stack>
                  </div>
             
              <TableContainer component={Paper}>
          <Table aria-label='pontos table'>
            <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome do aluno</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Whatsapp</TableCell>
              <TableCell>Valor mensal</TableCell>
              <TableCell>Data vencimento</TableCell>
              <TableCell>Situação</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
              <TableCell>Montar Treino</TableCell>
              <TableCell>Imprimir Treino</TableCell>
              
            </TableRow>
            </TableHead>
                <TableBody>
                    {students.length > 0 ? (
                      students.slice(startIndex, endIndex).map((ficha) => (
                        <TableRow key={ficha.id}>
                          <TableCell>{ficha.id}</TableCell>
                          <TableCell>{ficha.nome}</TableCell>
                          <TableCell>{ficha.email}</TableCell>
                          <TableCell>{ficha.whatsapp_formatado}</TableCell>
                          <TableCell>{ficha.valor_mensal.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}</TableCell>
                          <TableCell>{formatarData(ficha.data_vencimento)}</TableCell>
                          <TableCell>{ficha.ativo === 1 ? 'Ativo' : 'Inativo'}</TableCell> 
                          <TableCell>
                            <Tooltip arrow TransitionComponent={Zoom} title="Editar">
                              <Link to={`/cliente/${ficha.id}`} onClick={() => handleButtonEditarAluno(ficha.id)}>
                                <div className='flex items-center justify-center'>
                                  <BiEdit size={32} />
                                </div>
                              </Link>
                            </Tooltip>
                          </TableCell> 

                          <TableCell>
                          <Tooltip arrow TransitionComponent={Zoom} title="Deletar">
                              <div className='flex items-center justify-center'>
                                <AiFillDelete size={32} onClick={() => confirmDeleteAluno(ficha.id, ficha.nome)} className='cursor-pointer'/>   
                              </div>
                            </Tooltip>
                          </TableCell> 

                          <TableCell>
                          <Tooltip arrow TransitionComponent={Zoom} title="Montar Treino">
                              <div className='flex items-center justify-center'>
                                <CgGym size={32} onClick={() => navigate(`/treino/${ficha.id}`)}/>   
                              </div>
                            </Tooltip>
                          </TableCell> 

                          <TableCell>
                            <Tooltip arrow TransitionComponent={Zoom} title="Imprimir Treino"> 
                                <div className='flex items-center justify-center'>
                                  <PictureAsPdfIcon size={32} onClick={() => handleTrainingPrinter(ficha.id_ficha_ativo)} />
                                </div>
                            </Tooltip>
                          </TableCell> 
                                                            
                        </TableRow>
                      ))
                    ) : loading ? (
                      <TableRow>
                        <TableCell colSpan={7}>Carregando...</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>Nenhuma Aluno foi encontrado</TableCell>
                      </TableRow>
                    )}
    </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from} Até ${to} de ${count}`}
            component='div'
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
          </div>
        </div>
      </div>

  )
  
}

export default Home
