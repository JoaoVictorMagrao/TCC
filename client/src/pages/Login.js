import '../styles/login.css';
import React, { useState, useEffect, useContext } from 'react';
import { DataLoginContext } from '../context/DataLoginContext';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';
// import olhoOculto from '../img/olho-oculto.svg';
// import olho from '../img/olho.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import ReactModal from 'react-modal';


function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('Email ou senha incorretos.');
  const {setNameUser, nameUser } = useContext(DataLoginContext);
  const {setIdUser, idUser } = useContext(DataLoginContext);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function mostrarSenha() {
    setSenhaVisivel(!senhaVisivel)
  }

  const handleOpenModal = () => {
    setIsModalOpenEmail(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenEmail(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  /*----- API para verificar se o login do usuário existe -----*/
   const handleClickLogin = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      senha: values.senha,
    })
      .then((response) => {
        if (response.data.msg === 'OK') {
          setNameUser(response.data.nome);
          setIdUser(response.data.id);
          setShowAlert(false);
          navigate('/home');
        } else {
          setShowAlert(true);
        }
      })
      .catch((error) => {
        setAlertText('Erro ao conectar com o servidor, tente novamente mais tarde...')
        setShowAlert(true)
      })
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

  /*----- Validando campos de email e senha ----- */
  const validationLogin = yup.object().shape({
    email: yup.string().email('Não é um email').required('Este campo é obrigatório'),
    senha: yup
      .string()
      .min(6, 'A senha deve ter 6 caracteres')
      .required('O campo senha é obrigatório'),
  })

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <section >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen bg-login">                  
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <img className="mx-auto" src={logo} alt="Forfit GYM"/>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Bem-vindo! Por favor, faça login para acessar sua conta.
              </h1>

              {/* Modal aparece quando senha está errado ou não conectou com o servidor */}
                  {showAlert && (
                    <div role='alert' className='modalAtencao'>
                      <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>Atenção</div>
                      <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
                        <p>{alertText}</p>
                      </div>
                    </div>
                  )}

                  <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                      <Form className="space-y-4 md:space-y-6">
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                              <Field
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type='text'
                                name='email'
                                id='email'
                                placeholder='Digite seu e-mail...'
                              />
                              <ErrorMessage component='span' name='email' className='form-error text-red-500 text-sm' />
                          </div>

                          <div className="relative">
                              <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                              <Field
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type={senhaVisivel ? 'text' : 'password'}
                                name='senha'
                                id='senha'
                                placeholder='Digite sua senha...'
                              />
                              <ErrorMessage component='span' name='senha' className='form-error text-red-500 text-sm' />
                              {/* <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={mostrarSenha}
                                style={{ cursor: 'pointer' }}
                              >
                                <img
                                  src={senhaVisivel ? olho : olhoOculto}
                                  alt={senhaVisivel ? 'Esconder senha' : 'Mostrar senha'}
                                />
                              </span> */}
                          </div>
                          <div className="flex items-center justify-between">
                              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleOpenModal}>Esqueceu sua senha?</a>
                          </div>

                          <ReactModal
                             isOpen={isModalOpenEmail}
                             onRequestClose={handleCloseModal}
                             style={customStyles}
                             contentLabel="Example Modal"
                          >    
                            <div className="modal-content">
                              <p className="text-lg">Digite seu email:</p>
                              <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />
                              <div className='flex gap-3'>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2" >
                                  Enviar
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2" onClick={handleCloseModal}>
                                  Fechar
                                </button>
                              </div>
                            </div>
                          </ReactModal>
                          <button type="submit" id='btnLogar' className="buttonLogin w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Entrar
                          </button>
                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Não tem uma conta ainda? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Clique aqui</a>
                          </p>
                      </Form>
                  </Formik>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
