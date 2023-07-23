import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import check from '../img/check.png';
import SinalMais from '../img/Sinaldemais.png';
import axios from 'axios';
import { FaWeightHanging } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { VscCheckAll } from 'react-icons/vsc';
import { BiRepost } from 'react-icons/bi';
import { FaDumbbell } from 'react-icons/fa';







function Treino(){
  const { codigo, nome } = useParams();
  const [nomeAluno, setNomeAluno] = useState();
  const [telefoneAluno, setTelefoneAluno] = useState();
  const [mensalidadeAluno, setMensalidadeAluno] = useState();
  const [tabs, setTabs] = useState(['Treino A']);
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
 



  const addTab = () => {
    const lastTabIndex = tabs.length - 1;
    const lastTab = tabs[lastTabIndex];
    const nextAlphabetIndex = alphabets.indexOf(lastTab[lastTab.length - 1]) + 1;
    const nextAlphabet = alphabets[nextAlphabetIndex];

    setTabs([...tabs, `Treino ${nextAlphabet}`]);
  };
     
  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
  //  console.log(options);  Value do select do dias da semana

    setDiaDaSemana(options);
    setSelectedOptions(options);
  };

  const getDayOfWeek = (selectedOptions) => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return selectedOptions.map((option) => daysOfWeek[parseInt(option) - 1]);
  };
  

  async function getDadosAluno() {
    const response = await fetch(`http://localhost:3001/listaAlunoUnico/${codigo}`);
    const data = await response.json();
        setNomeAluno(data.nome);
        setTelefoneAluno(data.whatsapp);
        setMensalidadeAluno(data.valor_mensal);
      //  setImgAluno(data.img);         
  }

useEffect(() => {
  getDadosAluno();
}, []);

useEffect(() => {
  const fetchGrupoMuscular = async () => {
    try {
      const response = await axios.get('http://localhost:3001/listaGrupoMuscular');
      const listaGrupoMuscular = response.data;
      setGrupoMuscularOptions(listaGrupoMuscular);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  fetchGrupoMuscular();
}, []);

useEffect(() => {
  const fetchExercicios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/listaExercicios');
      const listaExercicios = response.data;
      setExerciciosOptions(listaExercicios);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  fetchExercicios();
}, []);

const handleClickDataExercises = () => {
  const newCardData = {
    grupoMuscular: grupoMuscular,
    exercicioTreino: exercicioTreino,
    seriesExercicio: seriesExercicio,
    repeticoesTreino: repeticoesTreino,
    cargaTreino: cargaTreino,
    descansoTreino: descansoTreino,
    descricaoTreino: descricaoTreino,
    diaDaSemana: diaDaSemana,
    idGrupoMuscular: idGrupoMuscular,
    idExercicio: idExercicio
  };
  setCardData((prevCardData) => [...prevCardData, newCardData]);

  setSeriesExercicio('');
  setRepeticoesTreino('');
  setCargaTreino('');
  setDescansoTreino('');
  setDescricaoTreino('');
 // console.log(cardData);
};

const handleFinalizeSheet = () => {
  console.log(cardData);

};

  return(
    <div>
      <Header />
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
                              value={grupoMuscular}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value; // Obter o valor da opção selecionada
                                setIdGrupoMuscular(selectedValue);
                                setGrupoMuscular(selectedOptionText);
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
                              value={exercicioTreino}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOptionText = e.target.options[selectedIndex].text;
                                const selectedValue = e.target.value; // Obter o valor da opção selecionada
                                setIdExercicio(selectedValue);
                                setExercicioTreino(selectedOptionText);
                              }}
                            >
                              <option value='' disabled hidden>
                                  Selecione um exercício
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
                  <div className='text-xl font-bold text-center'>Grupo Muscular: {card.grupoMuscular}</div>
                  <div className='flex justify-around'>
                      <div className='columnOne'>
                        <div className='flex gap-1'><FaDumbbell size={24}/> {card.exercicioTreino}</div>
                        <div className='flex gap-1'><VscCheckAll size={24}/> {card.seriesExercicio} Séries</div>
                        <div className='flex gap-1'> <BiRepost size={24}/>{card.repeticoesTreino} Repetição</div>
                      </div>
                      <div className='columnTwo'>
                        <div className='flex gap-1'> <FaWeightHanging size={16}/> {card.cargaTreino} KG</div>
                        <div className='flex gap-1'> <GiNightSleep size={16}/> {card.descansoTreino} Segundos</div>
                        {/* <div>Dia da Semana: {card.diaDaSemana.join(', ')}</div> */}
                      </div>
                  </div>
                </div>
              ))}

<div className='p-10 flex items-center justify-center'>
  <button
    data-te-ripple-color="light"
    className='ripple inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] bg-lime-600 p-2 rounded text-white font-bold'
    onClick={handleFinalizeSheet}
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