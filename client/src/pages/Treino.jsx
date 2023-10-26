import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import check from '../img/check.png';
import { useNavigate } from 'react-router-dom';
//import SinalMais from '../img/Sinaldemais.png';
import { singleStudentList } from '../services/StudentsServices.js';
import axios from 'axios';
import {useAuthUser} from 'react-auth-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';

/* ------------------------ Icones ----------------------*/
import { FaWeightHanging } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { VscCheckAll } from 'react-icons/vsc';
import { BiRepost } from 'react-icons/bi';
import { FaDumbbell } from 'react-icons/fa';
/* ------------------------ Arquivos com funções ----------------------*/
import { getDayOfWeek, fetchGrupoMuscular, getCurrentDate } from '../Util/util.js';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


/* ------------------------ Biblioteca Material UI ----------------------*/

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
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import '@mui/material/styles';



function Treino(){
 // const { idStudent, nameStudent } = useParams();
  const auth = useAuthUser();
  const { idStudent } = useParams();
  const [nomeAluno, setNomeAluno] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [valueTab, setValueTab] = useState(0); 
  const [tabs, setTabs] = useState(['Treino A']);
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
  const [cardDataEnviaDados, setCardDataEnviaDados] = useState([]);
  const [descricaoTreino, setDescricaoTreino] = useState('');
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [confirmDeactivateListing, SetConfirmDeactivateListing] = React.useState(false);
  const [openNameSheet, setOpenSaveSheet] = React.useState(false);
  const [exercicioSelectText, setExercicioSelectText] = useState("Selecione um grupo muscular");
  const [nameSheet, setNameSheet] = useState('');
  const [formData, setFormData] = useState({});
  const [isButtonDisabledFinalizeSheet, setIsButtonDisabledFinalizeSheet] = useState(cardDataEnviaDados.length === 0);
  const idTeacher = auth().id;
  const [dataSingleStudents, setDataSingleStudents] = useState([]);
  const [selectedDateFinalizeSheet, setSelectedDateFinalizeSheet] = useState(''); 
  const navigate = useNavigate()
  /* Por aba */
  // idGrupoMuscularPorAba: idGrupoMuscularPorAba,
  // idExercicioPorAba: idExercicioPorAba,
  // grupoMuscularPorAba: grupoMuscularPorAba,
  const [descricaoTreinoPorAba, setDescricaoPorAba] = useState('');
  const [grupoMuscularTreinoPorAba, setGrupoMuscularPorAba] = useState('');
  const [idGrupoMuscularTreinoPorAba, setIdGrupoMuscularPorAba] = useState('');
  const [exercicioTreinoPorAba, setExercicioTreinoPorAba] = useState('');
  const [idExercicioTreinoPorAba, setIdExercicioPorAba] = useState('');
  const [diaDaSemanaTreinoPorAba, setDiaDaSemanaTreinoPorAba] = useState('');
  const [seriesExercicioPorAba, setSeriesExercicioPorAba] = useState('');
  const [repeticoesTreinoPorAba, setRepeticoesTreinoPorAba] = useState('');
  const [cargaTreinoPorAba, setCargaTreinoPorAba] = useState('');
  const [descansoTreinoPorAba, setDescansoTreinoPorAba] = useState('');

  const handleDateChange = (event) => {
    setSelectedDateFinalizeSheet(event.target.value); // Atualiza o estado com a data selecionada
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const addTab = () => {
    if (tabs.length < 7) {
      const nextTab = String.fromCharCode(65 + tabs.length);
      setTabs([...tabs, `Treino ${nextTab}`]);
      setValue(tabs.length);
    }
  };

  const handleChangeTabs = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleInputChangeValueTab = (e, campo) => {
    const valor = e.target.value;
    setDescricaoPorAba({
      ...descricaoTreinoPorAba,
      [campo]: valor,
    });

    setRepeticoesTreinoPorAba({
      ...repeticoesTreinoPorAba,
      [campo]: valor,
    });

    setCargaTreinoPorAba({
      ...cargaTreinoPorAba,
      [campo]: valor,
    });

    setDescansoTreinoPorAba({
      ...descansoTreinoPorAba,
      [campo]: valor,
    });

    setSeriesExercicioPorAba({
      ...seriesExercicioPorAba,
      [campo]: valor,
    });

    setIdGrupoMuscularPorAba({
      ...idGrupoMuscularTreinoPorAba,
      [campo]: valor,
    });
    
    setIdExercicioPorAba({
      ...idExercicioTreinoPorAba,
      [campo]: valor,
    });

    setExercicioTreinoPorAba({
      ...exercicioTreinoPorAba,
      [campo]: valor,
    });
    
    setDiaDaSemanaTreinoPorAba({
      ...diaDaSemanaTreinoPorAba,
      [campo]: valor,
    });
    
  };

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

   
  
  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
  //  console.log(options);  Value do select do dias da semana
    setDiaDaSemana(options);
    setSelectedOptions(options);
  };


  useEffect(() => {
    //getDadosAluno(idStudent);
    singleStudentList(idStudent, setDataSingleStudents);
    fetchGrupoMuscular(setGrupoMuscularOptions);
    setIsButtonDisabledFinalizeSheet(cardDataEnviaDados.length === 0);
    if (idGrupoMuscular) {
      setExercicioSelectText("Exercicíos disponiveis");
    } else {
      setExercicioSelectText("Selecione um exercício");
    }
  }, [idGrupoMuscular, cardDataEnviaDados]);

const fetchExercicios = async (idGrupoMuscular) => {
  try {
    const response = await axios.get(`http://localhost:3001/listaExercicios/${idGrupoMuscular}`);
    const listaExercicios = response.data;
    setExerciciosOptions(listaExercicios);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};


const handleClickDataExercises = (tab) => {
  const trainingDay = {
    1: 'Treino G',
    2: 'Treino A',
    3: 'Treino B',
    4: 'Treino C',
    5: 'Treino D',
    6: 'Treino E',
    7: 'Treino F',
  };
  const trainingId = Object.keys(trainingDay).find((key) => trainingDay[key] === tab);

  const newCardData = {
    //[`exercicio${tab}`]: descricaoTreinoPorAba,     
     exercicioTreinoPorAba: exercicioTreino,
     seriesTreinoPorAba: seriesExercicioPorAba[`seriesExercicio-${tab}`],
     repeticoesTreinoPorAba: repeticoesTreinoPorAba[`repeticoesTreino-${tab}`],
     cargaTreinoPorAba: cargaTreinoPorAba[`cargaTreino-${tab}`],
     descansoTreinoPorAba: descansoTreinoPorAba[`descansoTreino-${tab}`],
     descricaoTreinoPorAba: descricaoTreinoPorAba[`descricaoTreino-${tab}`],
     diaDaSemanaPorAba: trainingId,
     idGrupoMuscularPorAba: idGrupoMuscular,
     idExercicioPorAba: idExercicio
    //  grupoMuscularPorAba: idGrupoMuscular,
  };

const condicaoSeries = (newCardData.seriesTreinoPorAba === '' || newCardData.seriesTreinoPorAba === undefined);
const condicaoCarga = (newCardData.cargaTreinoPorAba === '' || newCardData.cargaTreinoPorAba === undefined);
const condicaoDescanso = (newCardData.descansoTreinoPorAba === '' || newCardData.descansoTreinoPorAba === undefined);
const condicaoRepeticoes = (newCardData.repeticoesTreinoPorAba === '' || newCardData.repeticoesTreinoPorAba === undefined);
const verificaDiaSemana = newCardData.diaDaSemanaPorAba === undefined? 1: newCardData.diaDaSemanaPorAba;

    if(condicaoSeries || condicaoCarga || condicaoDescanso || condicaoRepeticoes){
      toast.warning('Preencha todos os campos obrigatórios!!!');
    }else{
      toast.success(`Exercicío adicionado com sucesso ao ${tab}`);

     
    const transformedData = {
      [`exercicio${tab}`]: [
        {
          id_exercicio: newCardData.idExercicioPorAba,
          id_dia_treino: verificaDiaSemana,
          descricao: newCardData.descricaoTreinoPorAba,
          id_grupo_muscular: newCardData.idGrupoMuscularPorAba,
          series:newCardData.seriesTreinoPorAba,
          carga: newCardData.cargaTreinoPorAba,
          descanso: newCardData.descansoTreinoPorAba,
          repeticoesTreino: newCardData.repeticoesTreinoPorAba,
        //  id_ficha: 1,
        // grupo_muscular: newCardData.grupoMuscularPorAba,
          exercicioTreino: newCardData.exercicioTreinoPorAba
        }
      ]  
    };

    const transformedDataEnviarDados = {
          id_exercicio: newCardData.idExercicioPorAba,
          id_dia_treino: newCardData.diaDaSemanaPorAba,
          descricao: newCardData.descricaoTreinoPorAba,
          id_grupo_muscular: newCardData.idGrupoMuscularPorAba,
          series:newCardData.seriesTreinoPorAba,
          carga: newCardData.cargaTreinoPorAba,
          descanso: newCardData.descansoTreinoPorAba,
          repeticoesTreino: newCardData.repeticoesTreinoPorAba,
          exercicioTreino: newCardData.exercicioTreinoPorAba  
    };

          setSeriesExercicioPorAba('');
          setRepeticoesTreinoPorAba('');
          setCargaTreinoPorAba('');
          setDescansoTreinoPorAba('');
          setDescricaoPorAba('');
          
    setCardDataEnviaDados((prevCardData) => [...prevCardData, transformedDataEnviarDados]);
    setCardData((prevCardData) => [...prevCardData, transformedData]);
  }
};
function removeExercicio(tab, id_exercicio) {
  const updatedCardData = cardData.filter((card) => {
    if (card[`exercicio${tab}`]) {
      return card[`exercicio${tab}`].every((exercise) => exercise.id_exercicio !== id_exercicio);
    }
    return true; 
  });

  // Crie um novo array excluindo o exercício com base no id_exercicio em cardDataEnviaDados
 // console.log(cardDataEnviaDados);
  const updatedCardDataEnviaDados = cardDataEnviaDados.filter(
    (exercise) => exercise.id_exercicio !== id_exercicio
  );
  
  setCardDataEnviaDados(updatedCardDataEnviaDados);
  setCardData(updatedCardData);
}

const handleFinalizeSheet = async () => {

  if(nameSheet === '' || selectedDateFinalizeSheet === ''){
    toast.warning('Preencha todos os campos.');
  }else{

    const fichaData = {
      id_professor: idTeacher,
      id_aluno: idStudent,
      nome_ficha: nameSheet,
      ativo: 1,
      data_criacao: getCurrentDate(),
      data_final: selectedDateFinalizeSheet
    };

    
    const cardDataEnviaDadosJSON = JSON.stringify(cardDataEnviaDados);
  
    const finalizedData = {
      ficha: fichaData,
      exercicio: cardDataEnviaDadosJSON
    };

  //  console.log(finalizedData);
    try {
      const response = await axios.post('http://localhost:3001/adicionarExercicioFichaAluno', {
        cardData: finalizedData, // Enviando o array cardData no corpo da requisição
      });
    if(response.data.message === 'OK'){
      toast.success('Ficha Cadastrada com sucesso!');
      setNameSheet('');
      setSelectedDateFinalizeSheet('');
      handleCloseNameSheet();
      setTimeout(() => {
        navigate(`/home`);
      }, 3500);
    }else{
      toast.error('Algo de errado aconteceu ao cadastrar a ficha, tente novamente.');
    }

    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
    }
  }
};
const [value, setValue] = React.useState('1');

  return(
    <div>
      <Header titleHeader={"Montar Treino"}/>
      <ToastContainer 
      autoClose={3000}
      position="bottom-right"
      theme="colored"  />
        <Dialog
          open={confirmDeactivateListing}
          TCoansitionComponent={Transition}
          keepMounted
          onClose={handleCloseFinalizeSheet}
          aria-describedby="alert-dialog-slide-description"
        >
        
          <DialogTitle>{`Deseja Realmente finalizar a ficha de ${dataSingleStudents.nome}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Se você concluir esta ficha e {dataSingleStudents.nome} possuir outra ficha ativa, aquela será inativada e esta nova ficha será ativada.
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
                  label="Selecione uma data de expiração da ficha"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={selectedDateFinalizeSheet}
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
    <div className="mx-auto flex justify-center items-center mt-16 w-80 md:w-4/5 mb-10">
    
    <Box sx={{ width: '100%', typography: 'body1', border: '1px ridge #ccc' }}>
    <TabContext value={valueTab} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} value={index} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={index}>
              {/* <div className='flex gap-10 p-5 w-4/5 mx-auto'> */}
                
                  {/* <div>
                        <label
                          htmlFor='nomeAluno'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                        >
                          Escolha o dia que o aluno ira realizar o {tab} <span className='text-red-500 text-xl font-bold'>*</span>
                        </label>
                      <select 
                       value={diaDaSemanaTreinoPorAba[`diaSemana-${tab}`] || ''}
                       onChange={(e) => {
                        const valorSelecionado = e.target.value;
                        setDiaDaSemanaTreinoPorAba({
                          ...diaDaSemanaTreinoPorAba,
                          [`diaSemana-${tab}`]: valorSelecionado,
                        });
                      }}
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
                     
                  </div> */}
                {/* {getDayOfWeek(selectedOptions).length > 0 && (
                  <div className="diasEscolhidos bg-gray-100 p-4 rounded-md shadow-md text-center">
                    <h1 className="text-xl font-bold mb-4">Dia escolhido</h1>""
                    <div className="gap-2">
                      {getDayOfWeek(selectedOptions).map((day) => (
                       
                        <p key={day} className="bg-blue-500 text-white py-2 px-4 rounded-md text-center">
                        
                          {day}
                        </p>
                      ))}
                    </div>
                  </div>
                )} */}
              {/* </div> */}

              <div className='w-4/5 p-5 mx-auto'>
                  <label
                    htmlFor='descricaoTreino'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                  >
                      Descrição do Treino 
                  </label>

                  <textarea
                    name={`descricaoTreino-${tab}`}
                    id={`descricaoTreino-${tab}`}
                    cols="10"
                    rows="2"
                    value={descricaoTreinoPorAba[`descricaoTreino-${tab}`] || ''}
                    onChange={(e) => handleInputChangeValueTab(e, `descricaoTreino-${tab}`)}
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
                              Grupo Muscular <span className='text-red-500 text-xl font-bold'>*</span>
                            </label>

                            <select
                              id={`grupoMuscular-${tab}`}
                              name={`grupoMuscular-${tab}`}
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={idGrupoMuscularTreinoPorAba[`grupoMuscular-${tab}`] || ''}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value; // Obter o valor da opção selecionada
                                handleInputChangeValueTab(e, `grupoMuscular-${tab}`)
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
                             Exércicio <span className='text-red-500 text-xl font-bold'>*</span>
                            </label>

                            <select
                              id={`exercicioTreino-${tab}`}
                              name={`exercicioTreino-${tab}`}
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={idExercicioTreinoPorAba[`exercicioTreino-${tab}`] || ''}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value;
                                handleInputChangeValueTab(e, `exercicioTreino-${tab}`)
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
                                Séries <span className='text-red-500 text-xl font-bold'>*</span>
                                </label>

                                <input
                                  type='number'
                                  id={`seriesExercicio-${tab}`}
                                  name={`seriesExercicio-${tab}`}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={seriesExercicioPorAba[`seriesExercicio-${tab}`] || ''}
                                  onChange={(e) => handleInputChangeValueTab(e, `seriesExercicio-${tab}`)}
                                />
                            </div>

                            <div className='repeticoes w-1/4'>
                            <label htmlFor='repeticoesTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Repetições <span className='text-red-500 text-xl font-bold'>*</span>
                                </label>

                                <input
                                  type='number'
                                  id={`repeticoesTreino-${tab}`}
                                  name={`repeticoesTreino-${tab}`}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={repeticoesTreinoPorAba[`repeticoesTreino-${tab}`] || ''}
                                  onChange={(e) => handleInputChangeValueTab(e, `repeticoesTreino-${tab}`)}
                                />
                            </div>

                            <div className='carga w-1/4'>
                            <label htmlFor='cargaTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Carga <span className='text-red-500 text-xl font-bold'>*</span>
                                </label>

                                <input
                                  type='number'
                                  id={`cargaTreino-${tab}`}
                                  name={`cargaTreino-${tab}`}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={cargaTreinoPorAba[`cargaTreino-${tab}`] || ''}
                                  onChange={(e) => handleInputChangeValueTab(e, `cargaTreino-${tab}`)}
                                />
                            </div>

                            <div className='descanso w-1/4'>
                            <label htmlFor='descansoTreino' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>   
                                Descanso (S) <span className='text-red-500 text-xl font-bold'>*</span>
                                </label>
                                
                                <input
                                  type='number'
                                  id={`descansoTreino-${tab}`}
                                  name={`descansoTreino-${tab}`}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={descansoTreinoPorAba[`descansoTreino-${tab}`] || ''}
                                  onChange={(e) => handleInputChangeValueTab(e, `descansoTreino-${tab}`)}
                                />
                            </div>
                          
                      </div> 
          {/* ------------------------------------------- FIM Linha 2 ------------------------------------------- */}

                      <div className='finalizarExercicio flex justify-end'>
                          <button className='bg-lime-600 w-9 h-9 flex justify-center items-center rounded mt-3' onClick={() => handleClickDataExercises(tab)}>
                          <Tooltip arrow TransitionComponent={Zoom} title="Incluir exercício">
                            <img src={check} alt="Check" />
                            </ Tooltip>
                          </button>
                      </div>     
      
              </div>
           {/* // {console.log(`Treino ${tab}`)} */}
           {cardData
            .filter((card) => card[`exercicio${tab}`]) // Filtrar exercícios com a chave correspondente à guia atual
            .map((filteredCard, index) => (
              <div key={index} className='cardExercicio w-4/5 mx-auto mt-5'>
                {filteredCard[`exercicio${tab}`].map((exercicio, exIndex) => (
                  <div className='flex justify-between bg-white rounded p-4 shadow-md mb-4' key={exIndex}>
                    <div className='flex items-center'>
                      <FaDumbbell className='text-blue-500' size={24} />
                      <span className='ml-2 font-semibold'>{exercicio.exercicioTreino}</span>
                    </div>
                    <div className='flex gap-5'>
                     
                      <div className='flex items-center'>
                        <VscCheckAll className='text-green-500' size={24} />
                        <span className='ml-2'>{exercicio.series} Séries</span>
                      </div>
                      <div className='flex items-center'>
                        <BiRepost className='text-purple-500' size={24} />
                        <span className='ml-2'>{exercicio.repeticoesTreino} Repetições</span>
                      </div>
                      <div className='flex items-center'>
                        <FaWeightHanging className='text-yellow-500' size={16} />
                        <span className='ml-2'>{exercicio.carga} KG</span>
                      </div>
                      <div className='flex items-center'>
                        <GiNightSleep className='text-indigo-500' size={16} />
                        <span className='ml-2'>{exercicio.descanso} Segundos</span>
                      </div>
                    </div>
                    <CloseIcon className='cursor-pointer' onClick={() => removeExercicio(tab, exercicio.id_exercicio)} />
                  </div>
                ))}
              </div>
            ))}

                <div className='p-10 flex justify-end'>
                  <button
                    className='ripple inline-block  bg-primary px-6 pb-2 pt-2.5 text-xs  uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] bg-lime-600 p-2 rounded text-white font-bold'
                    onClick={addTab}
                  >
                    Finalizar treino
                    
                  </button>
                </div>
          </TabPanel>
        ))}
 
         <div className=' flex items-center justify-center'>
            <button
              className='mb-5 ripple inline-block  bg-primary px-6 pb-2 pt-2.5 text-xs  uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] bg-lime-600 p-2 rounded text-white font-bold'
              onClick={handleClickOpen}
              disabled={isButtonDisabledFinalizeSheet}
            >
              Finalizar Ficha
            </button>
          </div>
      </TabContext>

</Box>







      
      </div>
    </div>
  )
}

export default Treino