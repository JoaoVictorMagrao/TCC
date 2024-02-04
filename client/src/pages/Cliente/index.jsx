import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCnpjCpf, validateCPF, formatPhoneNumber, validationPost, allowAlphanumericAndSpaces, } from '../../Util/util.js';
import { fetchDadosAluno } from './Functions/fetchDadosAluno';
//import { handleFormSubmit } from './Functions/handleFormSubmit';
//import { updateAluno } from '../services/StudentsServices.js';
import { useAuthUser } from 'react-auth-kit';
const urlParams = new URLSearchParams(window.location.search);
const idEditar = urlParams.get('id');

function Cliente() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
    // defaultValues: getDadosAluno
  })

  const navigate = useNavigate();
  const [idTeacher, setIdTeacher] = useState('');
  const auth = useAuthUser();

  const url = window.location.href;

  useEffect(() => {
    setIdTeacher(auth().id);
    const url = window.location.href;
    if (url.includes('id')) {
      fetchDadosAluno(idEditar, setValue);
    } else {
      clearForm();
    }
  }, []);


  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!allowAlphanumericAndSpaces(value)) {
      event.target.value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
  };

  const clearForm = () => {
    reset();
  };

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
    if (!url.includes('id')) {
      try {
        if (!validateCPF(cpfAluno)) {
          toast.warning("Cpf inválido");
        } else {
          const response = await Axios.post('http://localhost:3001/students/adicionarAluno', {
            nome: nomeAluno,
            senha: senhaAluno,
            cpf: cpfAluno,
            email: emailAluno,
            whatsapp: telefoneAluno.replace(/[\s()-]/g, ''),
            valor_mensal: parseFloat(mensalidadeAluno.replace('R$', '').trim().replace(',', '.')),
            id_professor: idTeacher,
            id_tipo_usuario: 2,
            ativo: parseInt(situacaoAluno),
            data_vencimento: dataVencimentoAluno.toISOString().split('T')[0]
          });


          if (response.data.message === 'OK') {
            navigate('/home')
          }
        }
      } catch (error) {
        // if (error.response.data.error === 'CPF já cadastrado') {
        //   setmsgError("Erro ao cadastrar CPF");
        //   setShowAlert(true)
        // }
      }
    } else {
      try {

        if (!validateCPF(cpfAluno)) {
          toast.warning("Cpf inválido");
        } else {
          const response = await Axios.put(`http://localhost:3001/students/updateAluno/${idEditar}`, {
            nome: nomeAluno,
            senha: senhaAluno,
            cpf: cpfAluno,
            email: emailAluno,
            whatsapp: telefoneAluno.replace(/[\s()-]/g, ''),
            valor_mensal: mensalidadeAluno,//parseFloat(mensalidadeAluno.replace('R$', '').trim().replace(',', '.')),
            id_professor: idTeacher,
            id_tipo_usuario: 2,
            ativo: parseInt(situacaoAluno),
            data_vencimento: dataVencimentoAluno.toISOString().split('T')[0],
          })

          if (response.data === 'OK') {
            navigate('/home')
          }
        }
      } catch (error) {

        if (error.response.data.error === 'Erro') {
          toast.error("Erro ao atualizar cliente.");
        }
      }
    }

  }

  useEffect(() => {
    clearForm();
  }, []);


  return (
    <div>
      <Header titleHeader={url.includes('id') ? 'Editar aluno' : 'Cadastrar Aluno'} />
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
                onInput={handleInputChange}
                {...register('nomeAluno')}
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
                <input
                  // mask='999.999.999-99'
                  id='cpfAluno'
                  name='cpfAluno'
                  {...register('cpfAluno', { maxLength: 14 })}
                  maxLength={14}
                  variant='outlined'
                  // defaultValue={getFabUtilityClass.formtCnpj(member?.cpf ?? '')}
                  onChange={e => setValue('cpfAluno', formatCnpjCpf(e.target.value))}
                  // onChange={(e) => { setValue('cpfAluno', {value:e.target.value}, {shouldValidate: false})}}
                  // value={getValues('cpfAluno') }
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
                <input
                  //mask='(99) 99999-9999'
                  type='text'
                  id='telefoneAluno'
                  name='telefoneAluno'
                  {...register('telefoneAluno')}
                  maxLength={14}
                  variant='outlined'
                  onChange={e => setValue('telefoneAluno', formatPhoneNumber(e.target.value))}

                  //value={getValues('telefoneAluno')}
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
              {url.includes('id') ? 'Editar aluno' : 'Cadastrar Aluno'}
            </button>
          </div>
        </form>

        <ToastContainer
          autoClose={3000}
          position="bottom-right"
          theme="colored" />

      </div>
    </div>
  )
}

export default Cliente
