import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Tooltip, Zoom} from '@mui/material';
//import { Trash, Pencil } from 'phosphor-react';
import { getStudentRecords } from '../services/StudentsServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthUser} from 'react-auth-kit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

function Fichas() {
  const auth = useAuthUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    alert(auth().id);
  }, []);

  return (
    <div>
      <div className='flex justify-end'>
        
      </div>
      <div className='w-3/5 mx-auto mt-5'>
      <TableContainer component={Paper}>
          <Table aria-label='pontos table'>
            <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome da ficha</TableCell>
              <TableCell>Data de criação</TableCell>
              <TableCell>Data de expiração</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
          
                    {sheet.length > 0 ? (
                      sheet.slice(startIndex, endIndex).map((ficha) => (
                        <TableRow key={ficha.id}>
                          <TableCell>{ficha.id}</TableCell>
                          <TableCell>{ficha.nome}</TableCell>
                          <TableCell>{ficha.dataCriacao}</TableCell>
                          <TableCell>{ficha.dataExpiracao}</TableCell>
                          <TableCell>
                          <Tooltip arrow TransitionComponent={Zoom} title="Editar">
                            {/* <Pencil
                              size={25}
                              color='black'
                              className='cursor-pointer ml-3'
                            /> */}
                             </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip arrow TransitionComponent={Zoom} title="Excluir">
                            {/* <Trash
                              size={25}
                              color='red'
                              className='cursor-pointer ml-3'
                            /> */}
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
                        <TableCell colSpan={7}>Nenhum ponto turístico cadastrado!</TableCell>
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
      <ToastContainer 
      autoClose={3000}
      position="bottom-right"
      theme="colored"  />
    </div>
  );
}

export default Fichas
