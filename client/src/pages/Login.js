import '../styles/login.css';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
// import olhoOculto from '../img/olho-oculto.svg';
// import olho from '../img/olho.svg';
//import * as yup from 'yup';
import Swal from 'sweetalert2';


function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  function mostrarSenha() {
    setSenhaVisivel(!senhaVisivel)
  }


  useEffect(() => {
    if(isAuthenticated()){
      navigate('/home');
    }
  }, [isAuthenticated, navigate])

  async function handleLogin(event) {
    event?.preventDefault();
    setIsLoginOpen(true);
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        senha: password,
      });

      if (response.data.msg === null) {
        setIsLoginOpen(false);
        Swal.fire({
          title: "Error",
          text: "Usuário ou senha incorretos",
          icon: "error",
          confirmButtonText: "Ok"
        })

        return;
      }

      if (response.data.msg === "OK") {
        if (
          signIn({
            token: response.data.token,
            expiresIn: 480,
            tokenType: "Bearer",
            authState: response.data.user,
          })
        ) {
          setTimeout(function () {
            // setLoading(false);
            navigate("/home"); // Redirect or do-something
          }, 1000);
        }
      }else{
        Swal.fire({
          title: "Error",
          text: "Usuário ou senha incorretos",
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    } catch (err) {
      // setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Erro ao conectar com o servidor, tente novamente mais tarde...",
        icon: "error",
        confirmButtonText: "Ok"
      })
      console.log(err);
    }
  }



  /*----- Validando campos de email e senha ----- */
  // const validationLogin = yup.object().shape({
  //   email: yup.string().email('Não é um email').required('Este campo é obrigatório'),
  //   senha: yup
  //     .string()
  //     .min(6, 'A senha deve ter 6 caracteres')
  //     .required('O campo senha é obrigatório'),
  // })

  // 
  return (
    <section >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen bg-login">                  
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <img className="mx-auto" src={logo} alt="Forfit GYM"/>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Bem-vindo! Por favor, faça login para acessar sua conta.
              </h1>

                  <form onSubmit={handleLogin}>
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
                                type={senhaVisivel ? 'text' : 'password'}
                                name='senha'
                                id='senha'
                                placeholder='Digite sua senha...'
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <p name='senha' className='form-error text-red-500 text-sm' />
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
                              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" >Esqueceu sua senha?</a>
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
    </section>
 
  )
}

export default Login
