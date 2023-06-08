import Header from '../components/Header';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { valorBotao } from './Home';


const validationPost = yup.object().shape({
  nomeAluno: yup
    .string()
    .required('O nome é obrigatório')
    .max(40, 'O título precisa ter no maximo 255 caracteres'),
  emailAluno: yup
    .string()
    .required('O email é obrigatório')
    .max(180, 'O email precisa ter no maximo 180 caracteres')
    .email('O texto informado não é um email'),
  cpfAluno: yup.string().required('O CPF é obrigatório').min(14, 'CPF incompleto'),
  telefoneAluno: yup
    .string()
    .required('O telefone é obrigatório')
    .min(14, 'O numero de telefone precisa ter pelo menos 9 caracteres'),
  //mensalidadeAluno: yup.string().required("O valor é obrigatório").max(13, "O valor não pode ser maior que 100,000.00"),
  dataVencimentoAluno: yup.date().required('A data de vencimento é obrigatória'),
  situacaoAluno: yup.string().required('A situação é obrigatório'),
  senhaAluno: yup.string().required('A senha é obrigatório'),
});

const urlParams = new URLSearchParams(window.location.search);
  const idEditar = urlParams.get('id');
  const nomeEditar = urlParams.get('nome');
  const emailEditar = urlParams.get('email');
  const cpfEditar = urlParams.get('cpf');
  const telefoneEditar = urlParams.get('telefone');
  const valorEditar = urlParams.get('valor_mensal');
  const dataVencimentoEditar = urlParams.get('data_vencimento');
  const formattedDataVencimento = (dataVencimentoEditar == null) ? '' : dataVencimentoEditar.slice(0, 10); // Extrai apenas 'yyyy-mm-dd'
  const situacaoEditar = urlParams.get('situacao');
  const senhaEditar = urlParams.get('senha');

function Cliente() {
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  })

  // const limparFormulario = () => {
  //   reset();
  // };
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [msgError, setmsgError] = useState('Erro as cadastrar CPF')
  
  const handleFormSubmit = async ({
    nomeAluno,
    senhaAluno,
    cpfAluno,
    emailAluno,
    telefoneAluno,
    mensalidadeAluno,
    situacaoAluno,
    dataVencimentoAluno,
  }) => {
      //  event.preventDefault();
    
  if(valorBotao === 'Cadastrar Aluno'){
    try {
      
        const response = await Axios.post('http://localhost:3001/adicionarAluno', {
          nome: nomeAluno,
          senha: senhaAluno,
          cpf: cpfAluno,
          email: emailAluno,
          whatsapp: telefoneAluno.replace(/[\s()-]/g, ''),
          valor_mensal: parseFloat(mensalidadeAluno.replace('R$', '').trim().replace(',', '.')),
          id_professor: 1,
          id_tipo_usuario: 2,
          ativo: parseInt(situacaoAluno),
          data_vencimento: dataVencimentoAluno.toISOString().split('T')[0],
        })

        if (response.data.message === 'OK') {
          navigate('/home')
        }
      } catch (error) {
        if (error.response.data.error === 'CPF já cadastrado') {
          setmsgError("Erro ao cadastrar CPF");
          setShowAlert(true)
        }
      }
  }else{
    try {  
        const response = await Axios.put(`http://localhost:3001/updateAluno/${idEditar}`, {
              nome: nomeAluno,
              senha: senhaAluno,
              cpf: cpfAluno,
              email: emailAluno,
              whatsapp: telefoneAluno.replace(/[\s()-]/g, ''),
              valor_mensal: parseFloat(mensalidadeAluno.replace('R$', '').trim().replace(',', '.')),
              id_professor: 1,
              id_tipo_usuario: 2,
              ativo: parseInt(situacaoAluno),
              data_vencimento: dataVencimentoAluno.toISOString().split('T')[0],
            })

            if (response.data === 'OK') {
              navigate('/home')
            }
    } catch (error) {

      if (error.response.data.error === 'Erro') {
        setmsgError("Erro ao atualizar cliente.");
        setShowAlert(true)
      }
    }
  }
 
  }

 
  /*-----  Esconder o box de erro de login depois de 3 segundos ----- */
  useEffect(() => {
    let timerId
    if (showAlert) {
      timerId = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [showAlert])
  return (
    <div>
      <Header />
      {/* Modal aparece quando tenta mandar os dados do cliente com um CPF ja cadastrado no banco */}
      {showAlert && (
        <div role='alert' className='modalAtencao w-1/5 m-auto mt-10'>
          <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>Atenção</div>
          <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
            <p className='font-bold'>{ msgError }</p>
          </div>
        </div>
      )}
      <div className='main'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='grid gap-6 mb-6 md:grid-cols-2 w-4/5 mx-auto mt-20'>
            <div>
              <label
                htmlFor='nomeAluno'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Nome
              </label>
              <input
                type='text'
                name='nomeAluno'
                id='nomeAluno'
                {...register('nomeAluno')}
                defaultValue={nomeEditar}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <p className='error-menssage'>{errors.nomeAluno?.message}</p>
            </div>
            <div className='mb-6'>
              <label
                htmlFor='emailAluno'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Email
              </label>
              <input
                type='email'
                name='emailAluno'
                id='emailAluno'
                {...register('emailAluno')}
                defaultValue={emailEditar}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <p className='error-menssage'>{errors.emailAluno?.message}</p>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='cpfAluno'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                >
                  CPF
                </label>
                <InputMask
                  mask='999.999.999-99'
                  id='cpfAluno'
                  name='cpfAluno'
                  {...register('cpfAluno')}
                  defaultValue={cpfEditar}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='error-menssage'>{errors.cpfAluno?.message}</p>
              </div>
              <div>
                <label
                  htmlFor='telefoneAluno'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                >
                  Telefone
                </label>
                <InputMask
                  mask='(99) 99999-9999'
                  type='text'
                  id='telefoneAluno'
                  name='telefoneAluno'
                  {...register('telefoneAluno')}
                  defaultValue={telefoneEditar}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='error-menssage'>{errors.telefoneAluno?.message}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='mensalidadeAluno'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                >
                  Valor
                </label>
                <input
                  type='text'
                  id='mensalidadeAluno'
                  name='mensalidadeAluno'
                  {...register('mensalidadeAluno')}
                  defaultValue={valorEditar}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='error-menssage'>{errors.mensalidadeAluno?.message}</p>
              </div>

              <div>
                <label
                  htmlFor='dataVencimentoAluno'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                >
                  Data Vencimento
                </label>
                <input
                  type='date'
                  id='dataVencimentoAluno'
                  name='dataVencimentoAluno'
                  {...register('dataVencimentoAluno')}
                  defaultValue={formattedDataVencimento}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='error-menssage'>{errors.dataVencimentoAluno?.message}</p>
              </div>
            </div>
            <div>
              <label
                htmlFor='situacaoAluno'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Situação
              </label>
              <select
                id='situacaoAluno'
                name='situacaoAluno'
                {...register('situacaoAluno')}
                defaultValue={situacaoEditar}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value='1'>Ativo</option>
                <option value='0'>Inativo</option>
              </select>
              <p className='error-menssage'>{errors.situacaoAluno?.message}</p>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='senhaAluno'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Senha
              </label>
              <input
                type='password'
                id='senhaAluno'
                name='senhaAluno'
                {...register('senhaAluno')}
                defaultValue={senhaEditar}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <p className='error-menssage'>{errors.senhaAluno?.message}</p>
            </div>
          </div>

          <div className='text-center'>
            <button
              type='submit'
              className='mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
            { valorBotao }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cliente
