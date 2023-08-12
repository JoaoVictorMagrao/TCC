import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import check from '../img/check.png';
//import SinalMais from '../img/Sinaldemais.png';
import axios from 'axios';
import {useAuthUser} from 'react-auth-kit';

/* ------------------------ Icones ----------------------*/
import { FaWeightHanging } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { VscCheckAll } from 'react-icons/vsc';
import { BiRepost } from 'react-icons/bi';
import { FaDumbbell } from 'react-icons/fa';
/* ------------------------ Arquivos com funções ----------------------*/
import { getDayOfWeek, getDadosAluno, fetchGrupoMuscular, getCurrentDate } from '../Util/util.js';


/* ------------------------ Biblioteca Material UI ----------------------*/
import { DataLoginContext } from "../context/DataLoginContext";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import '@mui/material/styles';



function Treino(){
 // const { idStudent, nameStudent } = useParams();
  const auth = useAuthUser();
  const { idStudent } = useParams();
  const [nomeAluno, setNomeAluno] = useState();
  //const [telefoneAluno, setTelefoneAluno] = useState();
  //const [mensalidadeAluno, setMensalidadeAluno] = useState();
  const [tabs, setTabs] = useState(['Treino A']);
  //const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [grupoMuscularOptions, setGrupoMuscularOptions] = useState([]);
  const [exerciciosOptions, setExerciciosOptions] = useState([]);
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [idGrupoMuscular, setIdGrupoMuscular] = useState('');
  const [exercicioTreino, setExercicioTreino] = useState('');
  const [idExercicio, setIdExercicio] = useState('');
  const [seriesExercicio, setSeriesExercicio] = useState('');
  const [repeticoesTreino, setRepeticoesTreino] = useState('');
  const [cargaTreino, setCargaTreino] = useState('');
  const [descansoTreino, setDescansoTreino] = useState('');
  const [cardData, setCardData] = useState([]);
  const [descricaoTreino, setDescricaoTreino] = useState('');
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [confirmDeactivateListing, SetConfirmDeactivateListing] = React.useState(false);
  const [openNameSheet, setOpenSaveSheet] = React.useState(false);
  const [exercicioSelectText, setExercicioSelectText] = useState("Selecione um grupo muscular");
  const [nameSheet, setNameSheet] = useState('');
  const idTeacher = auth().id;
  const [selectedDate, setSelectedDate] = useState(''); // Estado para guardar a data

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Atualiza o estado com a data selecionada
  };

  const formatDateForDatabase = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

 //Controla quando o modal abre e fecha
    const handleClickOpenSaveSheet = () => {
      setOpenSaveSheet(true);
    };
  
    const handleCloseNameSheet = () => {
      setOpenSaveSheet(false);
    };
  
    const handleClickOpen = () => {
      SetConfirmDeactivateListing(true);
    };
  
    const handleCloseFinalizeSheet = () => {
      SetConfirmDeactivateListing(false);
    };

    const handleClickacceptSheet = () => {
      handleClickOpenSaveSheet();
      SetConfirmDeactivateListing(false);
    };

    const handleNameSheetChange = (event) => {
      setNameSheet(event.target.value); // Atualiza o estado com o valor do input
    };
  
  // const addTab = () => {
  //   const lastTabIndex = tabs.length - 1;
  //   const lastTab = tabs[lastTabIndex];
  //   const nextAlphabetIndex = alphabets.indexOf(lastTab[lastTab.length - 1]) + 1;
  //   const nextAlphabet = alphabets[nextAlphabetIndex];

  //   setTabs([...tabs, `Treino ${nextAlphabet}`]);
  // };
     
  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
  //  console.log(options);  Value do select do dias da semana
    setDiaDaSemana(options);
    setSelectedOptions(options);
  };


useEffect(() => {
  //getDadosAluno(idStudent);
  fetchGrupoMuscular(setGrupoMuscularOptions);
}, []);

const fetchExercicios = async (idGrupoMuscular) => {
  try {
    const response = await axios.get(`http://localhost:3001/listaExercicios/${idGrupoMuscular}`);
    const listaExercicios = response.data;
    setExerciciosOptions(listaExercicios);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};


const handleClickDataExercises = () => {
  const newCardData = {
    grupoMuscular: grupoMuscular,
    exercicioTreino: exercicioTreino,
    seriesExercicio: seriesExercicio,
    repeticoesTreino: repeticoesTreino,
    cargaTreino: cargaTreino,
    descansoTreino: descansoTreino,
    descricaoTreino: descricaoTreino,
    diaDaSemana: 1,//diaDaSemana,
    idGrupoMuscular: idGrupoMuscular,
    idExercicio: idExercicio
  };

  const transformedData = {
    // ficha: {
    //   id_professor: idTeacher,
    //   id_aluno: idStudent,
    //   nome_ficha: nameSheet,
    //   ativo: 1,
    //   data_criacao: '2023-03-17',
    //   data_final: '2023-07-17'
    // },
    exercicio: [{
        id_exercicio: newCardData.idExercicio,
        id_dia_treino: newCardData.diaDaSemana,
        descricao: newCardData.descricaoTreino,
        id_grupo_muscular: newCardData.idGrupoMuscular,
        series: newCardData.seriesExercicio,
        carga: newCardData.cargaTreino,
        descanso: newCardData.descansoTreino,
      //  id_ficha: 1,
        grupo_muscular: newCardData.grupoMuscular,
        exercicioTreino: newCardData.exercicioTreino
      }]  
  };

  setCardData((prevCardData) => [...prevCardData, transformedData]);

  setSeriesExercicio('');
  setRepeticoesTreino('');
  setCargaTreino('');
  setDescansoTreino('');
  setDescricaoTreino('');
 // console.log(cardData);
};

useEffect(() => {
  if (idGrupoMuscular) {
    setExercicioSelectText("Exercicíos disponiveis");
  } else {
    setExercicioSelectText("Selecione um exercício");
  }
}, [idGrupoMuscular]);

const handleFinalizeSheet = async () => {
  //aqui
  
  const fichaData = {
    id_professor: idTeacher,
    id_aluno: idStudent,
    nome_ficha: nameSheet,
    ativo: 1,
    data_criacao: getCurrentDate(),
    data_final: selectedDate
  };

  const finalizedData = {
    ficha: fichaData,
    exercicio: cardData.map((data) => data.exercicio).flat() // Extrair os exercícios do cardData
  };

  console.log(finalizedData);
  // try {
  //   const response = await axios.post('http://localhost:3001/adicionarExercicioFichaAluno', {
  //     cardData: cardData, // Enviando o array cardData no corpo da requisição
  //   });

  //   console.log(response.data); // Verificar a resposta do servidor (se necessário)
  // } catch (error) {
  //   console.error('Erro ao enviar dados para o servidor:', error);
  // }
};

  return(
    <div>
      <Header />
     
        <Dialog
          open={confirmDeactivateListing}
          TCoansitionComponent={Transition}
          keepMounted
          onClose={handleCloseFinalizeSheet}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Deseja Realmente finalizar a ficha de ${nomeAluno}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Se você concluir esta ficha e {nomeAluno} possuir outra ficha ativa, aquela será inativada e esta nova ficha será ativada.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFinalizeSheet}>Cancelar</Button>
            <Button onClick={handleClickacceptSheet}>Ativar Ficha</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openNameSheet} onClose={handleCloseNameSheet}>
          <DialogTitle>Finalizar Ficha</DialogTitle>
            <DialogContent>
              <DialogContentText>
                O nome da ficha ira aparecer no app do seu aluno!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="nameSheet"
                label="Digite o nome da ficha..."
                type="text"
                fullWidth
                variant="standard"
                value={nameSheet} 
                onChange={handleNameSheetChange}
              />

              <TextField
                  margin="dense"
                  id="selectedDate"
                  label="Selecione uma data de inspiração da ficha"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedEndDate}
                  onChange={(newValue) => setSelectedEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  label="Selecione uma data"
                  fullWidth
                />
            </LocalizationProvider>
            </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNameSheet}>Cancelar</Button>
            <Button onClick={handleFinalizeSheet}>Salvar Ficha</Button>
          </DialogActions>
      </Dialog>
    <div className="mx-auto flex justify-center items-center mt-16 w-80 md:w-4/5">
        <Tabs className="w-80 md:w-4/5 ">
          <TabList className='m-0'>
            {tabs.map((tab, index) => (
              <Tab key={index}>{tab}</Tab>
            ))}
            {/* <button onClick={addTab}>
              <div className='bg-lime-400'>
                <img src={SinalMais} alt="+" />
              </div>
            </button> */}
          </TabList>

          {tabs.map((tab, index) => (
            <TabPanel key={index} className='border border-solid border-1 border-black rounded'>
              <div className='flex gap-10 p-5 w-4/5 mx-auto'>
                  {/* <div className='w-3/5'>
                        <label
                          htmlFor='nomeAluno'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                        >
                          Treino Predefinido
                        </label>
                        <select
                          id='situacaoAluno'
                          name='situacaoAluno'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                        {/* <option value='1'>Ativo</option>
                        <option value='0'>Inativo</option> }
                        </select>
                  </div> */}
                  <div>
                        <label
                          htmlFor='nomeAluno'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                        >
                          Escolha o dia que o aluno ira realizar o {tab}
                        </label>
                      <select multiple 
                      onChange={handleSelectChange}
                      value={diaDaSemana}
                    // value={selectedOptions}
                      className="w-full block appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                        
                        <option value="1">Domingo</option>
                        <option value="2">Segunda-feira</option>
                        <option value="3">Terça-feira</option>
                        <option value="4">Quarta-feira</option>
                        <option value="5">Quinta-feira</option>
                        <option value="6">Sexta-feira</option>
                        <option value="7">Sábado</option>
                      </select>
                     
                  </div>
                {getDayOfWeek(selectedOptions).length > 0 && (
                  <div className="diasEscolhidos bg-gray-100 p-4 rounded-md shadow-md text-center">
                    <h1 className="text-xl font-bold mb-4">Dia escolhido</h1>
                    <div className="gap-2">
                      {getDayOfWeek(selectedOptions).map((day) => (
                       
                        <p key={day} className="bg-blue-500 text-white py-2 px-4 rounded-md text-center">
                          {/* {setDiaDaSemana(day)} */}
                          {day}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className='w-4/5 p-5 mx-auto'>
                  <label
                    htmlFor='descricaoTreino'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                  >
                      Descrição do Treino
                  </label>

                  <textarea name="descricaoTreino" id="descricaoTreino" cols="10" rows="2"
                  value={descricaoTreino}
                  onChange={(e) => setDescricaoTreino(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>         
                  </textarea>
              </div>

              <div className='p-5 border border-solid border-y-stone-500 border-1 rounded w-4/5 mx-auto'>
                {/* ------------------------------------------- Linha 1 ------------------------------------------- */}
                      <div className='lineOne flex justify-between items-center gap-5'>
                        <div className='grupoMuscular w-1/2'>
                            <label
                              htmlFor='grupoMuscular'
                              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                            >   
                              Grupo Muscular
                            </label>

                            <select
                              id='grupoMuscular'
                              name='grupoMuscular'
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={idGrupoMuscular}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value; // Obter o valor da opção selecionada
                                setIdGrupoMuscular(selectedValue);
                                setGrupoMuscular(selectedOptionText);
                                fetchExercicios(selectedValue);
                              }}
                            
                            >
                               <option value='' disabled hidden>
                                  Selecione um grupo muscular
                                </option>
                                {grupoMuscularOptions.map((grupo) => (
                                  <option key={grupo.id} value={grupo.id}>
                                    {grupo.descricao}
                                  </option>
                                ))}
                            </select>
                        </div>

                        <div className='exercicio w-1/2'>
                             <label
                              htmlFor='exercicioTreino'
                              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                            >   
                             Exércicio
                            </label>

                            <select
                              id='exercicioTreino'
                              name='exercicioTreino'
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={idExercicio}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value;

                                setIdExercicio(selectedValue);
                                setExercicioTreino(selectedOptionText);
                                
                              }}  
                              disabled={!idGrupoMuscular}
                            >
                              <option value='' disabled hidden>
                              {exercicioSelectText}
                              </option>
                             {exerciciosOptions.map((grupo) => (
                                  <option key={grupo.id} value={grupo.id}>
                                    {grupo.descricao}
                                  </option>
                                ))}
                            </select>
                        </div>
                      </div>
                      {/* ------------------------------------------- FIM Linha 1 ------------------------------------------- */}

                      {/* ------------------------------------------- Linha 2 ------------------------------------------- */}
                      <div className='lineTwo flex gap-5 mt-5'>
                            <div className='series w-1/4'>
                                <label htmlFor='seriesExercicio' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Séries
                                </label>

                                <input
                                  type='number'
                                  id='seriesExercicio'
                                  name='seriesExercicio'
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={seriesExercicio}
                                  onChange={(e) => setSeriesExercicio(e.target.value)}
                                />
                            </div>

                            <div className='repeticoes w-1/4'>
                            <label htmlFor='repeticoesTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Repetições
                                </label>

                                <input
                                  type='text'
                                  id='repeticoesTreino'
                                  name='repeticoesTreino'
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={repeticoesTreino}
                                  onChange={(e) => setRepeticoesTreino(e.target.value)}
                                />
                            </div>

                            <div className='carga w-1/4'>
                            <label htmlFor='cargaTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Carga
                                </label>

                                <input
                                  type='number'
                                  id='cargaTreino'
                                  name='cargaTreino'
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={cargaTreino}
                                  onChange={(e) => setCargaTreino(e.target.value)}
                                />
                            </div>

                            <div className='descanso w-1/4'>
                            <label htmlFor='descansoTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Descanso (S)
                                </label>

                                <input
                                  type='number'
                                  id='descansoTreino'
                                  name='descansoTreino'
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={descansoTreino}
                                  onChange={(e) => setDescansoTreino(e.target.value)}
                                />
                            </div>
                          
                      </div>
          {/* ------------------------------------------- FIM Linha 2 ------------------------------------------- */}

                      <div className='finalizarExercicio flex justify-end'>
                          <button className='bg-lime-600 w-9 h-9 flex justify-center items-center rounded mt-3' onClick={handleClickDataExercises}>
                            <img src={check} alt="Check" />
                          </button>
                      </div>     
      
              </div>
              {/*  */}
              {cardData.map((card, index) => (
                <div key={index} className='cardExercicio bg-gray-100 p-4 rounded shadow w-3/5 mx-auto mt-5'>
                  <div className='text-xl font-bold text-center'>Grupo Muscular: {card.exercicio[0].grupo_muscular}</div>
                  {card.exercicio.map((exercicio, exIndex) => (
                    <div className='flex justify-around' key={exIndex}>
                      <div className='columnOne'>
                        <div className='flex gap-1'><FaDumbbell size={24}/> {exercicio.exercicioTreino}</div> {/* Modificação aqui */}
                        <div className='flex gap-1'><VscCheckAll size={24}/> {exercicio.series} Séries</div>
                        <div className='flex gap-1'> <BiRepost size={24}/>{exercicio.repeticoesTreino} Repetição</div>
                      </div>
                      <div className='columnTwo'>
                        <div className='flex gap-1'> <FaWeightHanging size={16}/> {exercicio.carga} KG</div>
                        <div className='flex gap-1'> <GiNightSleep size={16}/> {exercicio.descanso} Segundos</div>
                        {/* <div>Dia da Semana: {exercicio.id_dia_treino}</div> */}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

<div className='p-10 flex items-center justify-center'>
  <button
    className='ripple inline-block  bg-primary px-6 pb-2 pt-2.5 text-xs  uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] bg-lime-600 p-2 rounded text-white font-bold'
    onClick={handleClickOpen}
  >
    Finalizar Ficha
  </button>
</div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default Treino