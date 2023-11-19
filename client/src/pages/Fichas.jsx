import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Tooltip, Zoom, Stack, Slide, Modal, Typography, Button, Box} from '@mui/material';
//import { Trash, Pencil } from 'phosphor-react';
import { getStudentRecords } from '../services/StudentsServices';
import { searchStudents } from '../services/StudentsServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthUser} from 'react-auth-kit';
import Header from '../components/Header';
import { formatarData } from '../Util/util.js';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import fichasPDF from '../Reports/Fichas/fichas';

import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Fichas() {
  const auth = useAuthUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openModalPrinter, setOpenModalPrinter] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [listStudents, setListStudents] = useState(null);
  const [selectedDateStartPrint, setSelectedDateStartPrint] = useState('0'); 
  const [selectedDateEndPrint, setSelectedDateEndPrint] = useState('0'); 
  const [selectedIdStudent, setSelectedIdStudent] = useState('0');
  
  const handleDateStartPrinterChange = (event) => {
    setSelectedDateStartPrint(event.target.value);
  };

  const handleDateEndPrinterChange = (event) => {
    setSelectedDateEndPrint(event.target.value);
  };

  const idTeacher = auth().id;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  async function fetchData() {
    try {
      const data = await getStudentRecords(idTeacher,0,0,0);
      setSheet(data);
     
      setLoading(false);
    } catch (error) {
      console.error('Erro ao listar os alunos', error);
      setLoading(false);
    }
  }

  useEffect(() => {
   fetchData();
    searchStudents(idTeacher)
    .then(students => {
      setListStudents(students);
    })
    .catch(error => {
      console.error(error);
    });
   
  }, []);

  const handleClickOpenModalPrinter = () => {
    setOpenModalPrinter(true);
  };

  const handleClickCloseModalPrinter = () => {
    setOpenModalPrinter(false);
  };

  const handlePrinter = async  () => {

    const checkDataStart = (selectedDateStartPrint == '') ? 0 : selectedDateStartPrint;
    const checkDataEnd = (selectedDateEndPrint == '') ? 0 : selectedDateEndPrint;
    const checkIdStudent = (selectedIdStudent == '') ? 0 : selectedIdStudent;

    if(checkDataEnd < checkDataStart){
      toast.warning('A data inicial não pode ser maior que a data final.');
    }else{
      const data = await  getStudentRecords(idTeacher,checkDataEnd,checkDataStart,checkIdStudent);
      fichasPDF(data);
      setSheet(data);
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Header titleHeader={"Fichas"}/>
      <ToastContainer 
        autoClose={3000}
        position="bottom-right"
        theme="colored"  />

         <Dialog open={openModalPrinter} onClose={handleClickCloseModalPrinter}>
          <DialogTitle>Filtro - Impressão</DialogTitle>
            <DialogContent>
              <div className='p-4'>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listStudents}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSelectedIdStudent(newValue.year);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Aluno" />}
              />
          </div>
              <TextField
                  margin="dense"
                  id="selectedDate"
                  label="Data de inicio - Expiração"
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
                  label="Data Fim - Expiração"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={selectedDateEndPrint}
                  onChange={handleDateEndPrinterChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

            </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseModalPrinter}>Cancelar</Button>
            <Button onClick={handlePrinter}>Imprimir</Button>
          </DialogActions>
      </Dialog>
    
      <div className='w-3/5 mx-auto mt-5'>
      <Stack spacing={2} direction="row" className='float-right mb-2'> 
        <Button onClick={handleClickOpenModalPrinter} variant="contained"><span className='mr-1'><WysiwygIcon /> </span> Imprimir</Button>
      </Stack>

      <TableContainer component={Paper}>
          <Table aria-label='pontos table'>
            <TableHead>
            <TableRow>
              <TableCell>Nome do aluno</TableCell>
              <TableCell>Nome da ficha</TableCell>
              <TableCell>Data de criação</TableCell>
              <TableCell>Data de expiração</TableCell>
              
            </TableRow>
            </TableHead>
                <TableBody>
                    {sheet.length > 0 ? (
                      sheet.slice(startIndex, endIndex).map((ficha) => (
                        <TableRow key={ficha.id}>
                          <TableCell>{ficha.nome_aluno}</TableCell>
                          <TableCell>{ficha.nome_ficha}</TableCell>
                          <TableCell>{formatarData(ficha.data_criacao)}</TableCell>
                          <TableCell>{formatarData(ficha.data_final)}</TableCell>                                   
                        </TableRow>
                      ))
                    ) : loading ? (
                      <TableRow>
                        <TableCell colSpan={7}>Carregando...</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>Nenhuma ficha foi encontrada.</TableCell>
                      </TableRow>
                    )}
    </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from} Até ${to} de ${count}`}
            component='div'
            count={sheet.length}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Excluir Ponto Turístico"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Tem certeza de que deseja excluir este Ponto Turístico? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>
           Cancelar
        </Button>
        <Button>
          Excluir
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Fichas
