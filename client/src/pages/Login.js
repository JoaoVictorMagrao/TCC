import '../styles/login.css'
import React from 'react'
import { useState } from 'react'
import logo from '../img/logo.svg'
import olhoOculto from '../img/olho-oculto.svg'
import olho from '../img/olho.svg'
import setaLogin from '../img/seta-loginsvg.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'

function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false)

  function mostrarSenha() {
    setSenhaVisivel(!senhaVisivel)
  }

  const handleClickLogin = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      senha: values.senha,
    }).then((response) => {
      console.log(response)
    })
  }

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
