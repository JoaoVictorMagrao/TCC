import '../styles/login.css';

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAlunos, excluirAluno, fetchStudentsPrinter, fetchValuesStudents } from '../services/StudentsServices.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Stack, Button } from '@mui/material';
import { BiEdit } from 'react-icons/bi';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { AiFillDelete } from 'react-icons/ai';
import { formatarData } from '../Util/util.js';
import { CgGym } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { DataLoginContext } from "../context/DataLoginContext";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import DrawerLeft from '../components/DrawerLeft';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import alunosPDF from '../Reports/Alunos/alunos';
import valoresPDF from '../Reports/Valores/valores';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export let valorBotao = 'Editar Aluno';


function Home() {
  const [filtroSituacao, setFiltroSituacao] = useState('2');
  const [filtroOrdemValores, setFiltroOrdemValores] = useState('0');
  const [filtroNome, setFiltroNome] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [loading, setLoading] = useState(true);
  const [idTeacher, setIdTeacher] = useState('');
  const [openModalPrinter, setOpenModalPrinter] = React.useState(false);
  const [openModalPrinterListValues, setOpenModalPrinterListValues] = React.useState(false);
  const [openModalChoosePrint, setOpenModalChoosePrint] = React.useState(false);
  const [selectedDateStartPrint, setSelectedDateStartPrint] = useState('0');
  const [selectedDateEndPrint, setSelectedDateEndPrint] = useState('0');

  const Swal = require('sweetalert2');
  // const { idTeacher } = useContext(DataLoginContext);
  //const [cadastrarAluno, setCadastrarAluno] = useState(false);

  // const handleTrainingPrinter = async  (fichaAtivo) => {
  //   const data = await searchStudentTraining(fichaAtivo);
  //   treinoPDF(data);
  //   setLoading(false);
  // };

  const navigate = useNavigate()
  const auth = useAuthUser();

  useEffect(() => {
    setIdTeacher(auth().id);
    fetchAlunos(auth().id, 2, filtroNome, setStudents);
  }, [])

  const handlePrinter = async () => {
    const data = await fetchStudentsPrinter(idTeacher, filtroSituacao);
    alunosPDF(data.data);
    setLoading(false);
  };

  const handlePrinterListValues = async () => {

    const data = await fetchValuesStudents(idTeacher, selectedDateStartPrint, selectedDateEndPrint, filtroOrdemValores);
    valoresPDF(data.resultado);
    setLoading(false);
  };


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
      if (response === 'OK') {
        toast.success('Aluno excluído com sucesso!');
        fetchAlunos(idTeacher, 2, filtroNome, setStudents);
      } else {
        toast.error('Erro ao excluir aluno!');
      }

    } catch (error) {
      toast.error('Ocorreu um erro ao excluir o aluno!');
    }
  };

  /*---------------------- FIM EXCLUIR ALUNO ----------------------*/
  const handleFiltroSituacaoChange = (event) => {
    fetchAlunos(idTeacher, event.target.value, filtroNome, setStudents);
    setFiltroSituacao(event.target.value);
    setLoading(false);
  };

  const handleFiltroOrdemValoresChange = (event) => {
    // fetchAlunos(idTeacher, event.target.value, filtroNome, setStudents);
    setFiltroOrdemValores(event.target.value);
    setLoading(false);
  };




  const openWhatsapp = async (number, name) => {
    try {
      let formattedNumber = number.replace(/[^\w\s]/gi, "").replace(/ /g, "");
      let url = `https://web.whatsapp.com/send?phone=${formattedNumber}`;
      url += `&text=${encodeURI(`Olá ${name}, estou passando para avisar que sua ficha já está pronta, entre no app para visualizar seu treino.`)}&app_absent=0`;

      // Open our newly created URL in a new tab to send the message
      window.open(url);

    } catch (error) {

    }
  };

  const handleFiltroNomeChange = (event) => {
    fetchAlunos(idTeacher, filtroSituacao, event.target.value, setStudents);
    setFiltroNome(event.target.value);
    setLoading(false);
  };

  const handleClickOpenModalPrinter = () => {
    setOpenModalPrinter(true);
  };

  const handleClickCloseModalPrinter = () => {
    setOpenModalPrinter(false);
  };

  const handleClickOpenModalChoosePrinter = () => {
    setOpenModalChoosePrint(true);
  };

  const handleClickCloseModalChoosePrinter = () => {
    setOpenModalChoosePrint(false);
  };

  const handleClickCloseModalPrinteListValues = () => {
    setOpenModalPrinterListValues(false);
  };

  const handleClickOpenModalPrinteListValues = () => {
    setOpenModalPrinterListValues(true);
  };

  const handleDateStartPrinterChange = (event) => {
    setSelectedDateStartPrint(event.target.value);
  };

  const handleDateEndPrinterChange = (event) => {
    setSelectedDateEndPrint(event.target.value);
  };


  return (
    //   Hello {auth().nome}
    <div>
      <DrawerLeft nome={auth().nome} />
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        theme="colored" />
      <Dialog open={openModalChoosePrint} onClose={handleClickCloseModalChoosePrinter}>
        <DialogTitle>Relatórios</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }} onClick={handleClickOpenModalPrinter}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Situação Aluno
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Relatório para verificar situação dos alunos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>

        <DialogContent>
          <Card sx={{ maxWidth: 345 }} onClick={handleClickOpenModalPrinteListValues}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Valores
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Relatório sobre valores dos alunos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClickCloseModalChoosePrinter}>Cancelar</Button>
            <Button onClick={handleClickOpenModalChoosePrinter}>Imprimir</Button>
          </DialogActions> */}
      </Dialog>

      <Dialog open={openModalPrinter} onClose={handleClickCloseModalPrinter}>
        <DialogTitle>Filtro - Impressão</DialogTitle>
        <DialogContent>
          <label htmlFor="filtroSituacao"> Situação</label>
          <select id='filtroSituacao'
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

      <Dialog open={openModalPrinterListValues} onClose={handleClickCloseModalPrinteListValues}>
        <DialogTitle>Filtro - Impressão</DialogTitle>
        <DialogContent>

          <DialogContent>
            <label htmlFor="filtroSituacao"> Ordenação em valores</label>
            <select id='filtroOrdemValores'
              name='filtroOrdemValores'
              className='border text-sm rounded-lg block w-full p-2.5'
              value={filtroOrdemValores}
              onChange={handleFiltroOrdemValoresChange}>
              <option value="0">Sem ordem</option>
              <option value="1">Crescente</option>
              <option value="2">Descrecente</option>
            </select>
          </DialogContent>

          <TextField
            margin="dense"
            id="selectedDate"
            label="Data de inicio - Cadastro"
            type="date"
            fullWidth
            variant="standard"
            value={selectedDateStartPrint}
            onChange={handleDateStartPrinterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            margin="dense"
            id="selectedDate"
            label="Data Fim - Cadastro"
            type="date"
            fullWidth
            variant="standard"
            value={selectedDateEndPrint}
            onChange={handleDateEndPrinterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogActions>
            <Button onClick={handleClickCloseModalPrinteListValues}>Cancelar</Button>
            <Button onClick={handlePrinterListValues}>Imprimir</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

      <div className="flex flex-col w-4/5 mx-auto overflow-x-auto lg:overflow-x-hidden mt-4">
        <div class="flex flex-col overflow-x-auto w-4/5 mx-auto">
          <div className='flex'>
            <div className="flex flex-col">
              <label htmlFor="filtroSituacao"> Situação</label>
              <select id='filtroSituacao'
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
                onChange={handleFiltroNomeChange} />
            </div>
          </div>

          <div className='flex justify-end'>
            <Stack spacing={2} direction="row" className='float-right mb-2'>
              <Button onClick={handleClickOpenModalChoosePrinter} variant="contained"><span className='mr-1'><WysiwygIcon /> </span> Imprimir</Button>
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
                  {/* <TableCell>Imprimir Treino</TableCell> */}

                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(students)}
                {students.length > 0 ? (
                  students.slice(startIndex, endIndex).map((ficha) => (
                    <TableRow key={ficha.id}>
                      <TableCell>{ficha.id}</TableCell>
                      <TableCell>{ficha.nome}</TableCell>
                      <TableCell>{ficha.email}</TableCell>
                      <Tooltip arrow TransitionComponent={Zoom} title="Enviar msg">
                        <TableCell className='cursor-pointer' onClick={() => openWhatsapp(ficha.whatsapp_formatado, ficha.nome)} >{ficha.whatsapp_formatado}</TableCell>
                      </Tooltip>
                      <TableCell>{ficha.valor_mensal.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}</TableCell>
                      <TableCell>{formatarData(ficha.data_vencimento)}</TableCell>
                      <TableCell>
                        {ficha.ativo === 1 ? (
                          <span className="inline-block h-3 w-3 bg-green-500 rounded-full"></span>

                        ) : (
                          <span className="inline-block h-3 w-3 bg-red-500 rounded-full"></span>
                        )}
                      </TableCell>
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
                            <AiFillDelete size={32} onClick={() => confirmDeleteAluno(ficha.id, ficha.nome)} className='cursor-pointer' />
                          </div>
                        </Tooltip>
                      </TableCell>

                      <TableCell>
                        <Tooltip arrow TransitionComponent={Zoom} title="Montar Treino">
                          <div className='flex items-center justify-center'>
                            <CgGym size={32} onClick={() => navigate(`/treino/${ficha.id}`)} className='cursor-pointer' />
                          </div>
                        </Tooltip>
                      </TableCell>

                      {/* <TableCell>
                            <Tooltip arrow TransitionComponent={Zoom} title="Imprimir Treino"> 
                                <div className='flex items-center justify-center'>
                                  <PictureAsPdfIcon size={32} onClick={() => handleTrainingPrinter(ficha.id_ficha_ativo)} />
                                </div>
                            </Tooltip>
                          </TableCell>  */}

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
