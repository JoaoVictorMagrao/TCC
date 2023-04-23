import '../styles/login.css'
import React from 'react'
import { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
/*----- Imagens -----*/
import logo from '../img/logo.svg'
import olhoOculto from '../img/olho-oculto.svg'
import olho from '../img/olho.svg'
import setaLogin from '../img/seta-loginsvg.svg'
/*----- Imagens -----*/
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'

function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  //const history = useHistory()

  function mostrarSenha() {
    setSenhaVisivel(!senhaVisivel)
  }

  /*----- API para verificar se o login do usuário existe -----*/
  const handleClickLogin = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      senha: values.senha,
    })
      .then((response) => {
        if (response.data.msg === 'OK') {
          //history.push('/client/src/pages/Home.js')
          setShowAlert(false)
        } else {
          setShowAlert(true)
        }
      })
      .catch((error) => {
        console.log(error)
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
    senha: yup.string().min(6, 'A senha deve ter 6 caracteres').required(),
  })

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='ForFit Gym' />
        <span>Bem-vindo! Por favor, faça login para acessar sua conta.</span>
      </header>
      {showAlert && (
        <div role='alert'>
          <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>Atenção</div>
          <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
            <p>Email ou senha incorretos.</p>
          </div>
        </div>
      )}
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className='loginForm'>
          <div className='inputContainer'>
            <label htmlFor='email'>E-mail</label>
            <Field
              className='form-field'
              type='text'
              name='email'
              id='email'
              placeholder='Digite seu e-mail...'
            />
            <ErrorMessage component='span' name='email' className='form-error' />
          </div>

          <div className='inputContainer'>
            <label htmlFor='senha'>Senha</label>
            <Field
              className='form-field'
              type={senhaVisivel ? 'text' : 'password'}
              name='senha'
              id='senha'
              placeholder='Digite sua senha...'
            />
            <ErrorMessage component='span' name='senha' className='form-error' />
            <span className='icone-senha' onClick={mostrarSenha} style={{ cursor: 'pointer' }}>
              <img
                src={senhaVisivel ? olho : olhoOculto}
                alt={senhaVisivel ? 'Esconder senha' : 'Mostrar senha'}
              />
            </span>
          </div>

          <a href=''>Esqueceu sua senha?</a>

          <button className='buttonLogin' id='btnLogar' type='submit'>
            Entrar <img src={setaLogin} alt='' />
          </button>

          <div className='footer'>
            <p> Ainda não possui cadastro em nosso site?</p>
            <a href='#'> Entre em contato conosco para realizá-lo.</a>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
