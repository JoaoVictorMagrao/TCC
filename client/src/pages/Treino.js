import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SinalMais from '../img/Sinaldemais.png';



function Treino(){
  const { codigo, nome } = useParams();
  const [nomeAluno, setNomeAluno] = useState();
  const [telefoneAluno, setTelefoneAluno] = useState();
  const [mensalidadeAluno, setMensalidadeAluno] = useState();
  const [tabs, setTabs] = useState(['Treino A']);
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addTab = () => {
    const lastTabIndex = tabs.length - 1;
    const lastTab = tabs[lastTabIndex];
    const nextAlphabetIndex = alphabets.indexOf(lastTab[lastTab.length - 1]) + 1;
    const nextAlphabet = alphabets[nextAlphabetIndex];

    setTabs([...tabs, `Treino ${nextAlphabet}`]);
  };


    
  
    const handleSelectChange = (event) => {
      const options = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedOptions(options);
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


  return(
    <div>
      <Header />
    <div className="mx-auto flex justify-center items-center mt-16 w-80 md:w-4/5">
        <Tabs className="w-80 md:w-4/5 ">
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}>{tab}</Tab>
            ))}
            {/* <button onClick={addTab}>
              <div className='bg-lime-400'>
                <img src={SinalMais} alt="+" />
              </div></button> */}
          </TabList>

          {tabs.map((tab, index) => (
            <TabPanel key={index} >
              <div className='flex justify-around'>
                <div className='w-3/5'>
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
                  <option value='0'>Inativo</option> */}
                  </select>
                </div>
                <div>
                    <label
                      htmlFor='nomeAluno'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                    >
                      Escolha o dia que o aluno ira realizar o {tab}
                    </label>
                  <select multiple 
                  onChange={handleSelectChange}
                  value={selectedOptions}
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
              </div>

              <div className='w-3/4'>
                  <label
                    htmlFor='descricaoTreino'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                  >
                      Descrição do Treino
                  </label>

                  <textarea name="descricaoTreino" id="descricaoTreino" cols="10" rows="2"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>         
                  </textarea>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default Treino