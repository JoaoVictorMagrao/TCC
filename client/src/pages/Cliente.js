import Header from '../components/Header';
import InputMask from 'react-input-mask';
import { NumericFormat   } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import * as yup from 'yup';


const validationPost = yup.object().shape({
  title: yup.string().required("O título é obrigatório").max(40, "O título precisa ter menosde 40 caracteres"),
  description: yup.string().required("A descrição é obrigatório").max(150, "A descrição precisa ter menosde 150 caracteres"),
  content: yup.string().required("O conteúdo é obrigatório").max(500, "O conteúdo precisa ter menosde 500 caracteres")
})

function Cliente(){
    const [nomeAluno, setNomeAluno] = useState('');
    const [telefoneAluno, setTelefoneAluno] = useState('');
    const [emailAluno, setEmailAluno] = useState('');
    const [valorAluno, setValorAluno] = useState('');
    const [situacaoAluno, setSituacaoAluno] = useState('1');
    const [senhaAluno, setSenhaAluno] = useState('');
    const [cpfAluno, setCpfAluno] = useState('');
    const [dataVencimentoAluno, setdataVencimentoAlunoo] = useState('');
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
  
    const  handleFormSubmit  = async  (event) => {
      event.preventDefault();

      try {
        const response = await Axios.post('http://localhost:3001/adicionarAluno', {
          nome: nomeAluno,
          senha: senhaAluno,
          cpf: cpfAluno,
          email: emailAluno,
          whatsapp: telefoneAluno.replace(/[\s()-]/g, ''),
          valor_mensal: parseFloat(valorAluno.replace("R$", "").trim().replace(",", ".")),
          id_professor: 1,
          id_tipo_usuario: 2,
          ativo: parseInt(situacaoAluno),                
          data_vencimento: dataVencimentoAluno
        });
  
        if(response.data.message === 'OK'){
              // Limpar os campos do formulário
              setNomeAluno('');
              setTelefoneAluno('');
              setEmailAluno('');
              setValorAluno('');
              setSenhaAluno('');
              setCpfAluno('');
        } 
      } catch (error) {
        if(error.response.data.error === 'CPF já cadastrado'){
          setShowAlert(true);
        }
      }
    };

      /*-----  Esconder o box de erro de login depois de 3 segundos ----- */
  useEffect(() => {
    let timerId;
    if (showAlert) {
      timerId = setTimeout(() => {
        setShowAlert(false);
      }, 3000)
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [showAlert])
  return(
    <div>
      <Header />
      {/* Modal aparece quando tenta mandar os dados do cliente com um CPF ja cadastrado no banco */}
      {showAlert && (
        <div role='alert' className='modalAtencao w-1/5 m-auto mt-10'>
          <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>Atenção</div>
          <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
            <p className='font-bold'>CPF ja cadastrado.</p>
          </div>
        </div>
      )}
      <div className='main'>
      <form onSubmit={handleFormSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2 w-4/5 mx-auto mt-20">
              <div>
                  <label htmlFor="nomeAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome</label>
                  <input type="text" onChange={(e) => setNomeAluno(e.target.value)} id="nomeAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
              <div className="mb-6">
                <label htmlFor="emailAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                <input type="email"
                 id="emailAluno"
                 onChange={(e) => setEmailAluno(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>  
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cpfAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">CPF</label>
                  <InputMask
                  mask="999.999.999-99"
                  id="cpfAluno"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setCpfAluno(e.target.value)}
                />
                </div>
              <div>
                <label htmlFor="telefoneAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Telefone</label>
                <InputMask mask="(99) 99999-9999" onChange={(e) => setTelefoneAluno(e.target.value)} type="text" id="telefoneAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
             
            </div>         
            <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mensalidadeAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Valor</label>
                  <NumericFormat
                    thousandSeparator={true}
                    prefix={'R$'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    isNumericString={true}
                    getInputRef={inputRef => inputRef && inputRef.setAttribute('inputmode', 'numeric')}
                    type="text" onChange={(e) => setValorAluno(e.target.value)}
                    id="mensalidadeAluno"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>

                <div>
                  <label htmlFor="dataVencimentoAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Data Vencimento</label>
                  <input type="date" onChange={(e) => setdataVencimentoAlunoo(e.target.value)} id="dataVencimentoAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
           
            </div>
              <div>
                  <label htmlFor="situacaoAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Situação</label>
                  <select id="situacaoAluno"
                   onChange={(e) => setSituacaoAluno(e.target.value)} 
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
              </div>

              <div className="mb-6">
                <label htmlFor="senhaAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Senha</label>
                <input type="password"
                 onChange={(e) => setSenhaAluno(e.target.value)}
                 id="senhaAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div> 
          </div> 

          <div className='text-center'>
            <button type="submit"
            className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar Aluno</button>
          </div>
    </form>


      </div>
    </div>
  )

} 

export default Cliente;