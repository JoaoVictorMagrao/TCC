export async function handleLogin(event, setIsLoginOpen, username, password, axios, toast, navigate, signIn) {
  event?.preventDefault();
  setIsLoginOpen(true);
  try {
    const response = await axios.post('http://localhost:3001/teachers/login', {
      email: username,
      senha: password,
    });

    if (response.data.msg === null) {
      setIsLoginOpen(false);
      toast.error("Ocorreu alguem erro ao fazer seu login, tente novamente mais tarde!");
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

          navigate("/home");
          // toast.success('Login efetuado com sucesso!!!');
        }, 2000);
      }
    } else {
      setIsLoginOpen(false);
      toast.warning('Usuário ou senha incorreto.');
    }
  } catch (err) {
    setIsLoginOpen(false);
    toast.warning("ERRO: " + err);
    console.log(err);
  }
}