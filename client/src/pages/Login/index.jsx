import '../../styles/login.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.svg';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLogin } from './Functions/handleLogin';

function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate])


  return (
    <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen bg-login">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img className="mx-auto" src={logo} alt="Forfit GYM" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Bem-vindo! Por favor, faça login para acessar sua conta.
            </h1>
            <form onSubmit={(event) => handleLogin(event, setIsLoginOpen, username, password, axios, toast, navigate, signIn)}>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Digite seu e-mail...'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p name='email' className='form-error text-red-500 text-sm' />
                </div>

                <div className="relative">
                  <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type={'password'}
                    name='senha'
                    id='senha'
                    placeholder='Digite sua senha...'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p name='senha' className='form-error text-red-500 text-sm' />

                </div>


                <button disabled={isLoginOpen} type="submit" id='btnLogar' className="buttonLogin w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Entrar
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Não tem uma conta ainda? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Clique aqui</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        theme="colored" />
    </section>

  )
}

export default Login
