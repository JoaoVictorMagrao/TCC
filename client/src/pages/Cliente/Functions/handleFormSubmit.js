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