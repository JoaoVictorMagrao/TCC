export const handleFinalizeSheet = async (nameSheet, selectedDateFinalizeSheet, toast, idTeacher, idStudent, getCurrentDate, cardDataEnviaDados, axios, setNameSheet, setSelectedDateFinalizeSheet, handleCloseNameSheet, navigate) => {

  if (nameSheet === '' || selectedDateFinalizeSheet === '') {
    toast.warning('Preencha todos os campos.');
  } else {

    const fichaData = {
      id_professor: idTeacher,
      id_aluno: idStudent,
      nome_ficha: nameSheet,
      ativo: 1,
      data_criacao: getCurrentDate(),
      data_final: selectedDateFinalizeSheet
    };


    const cardDataEnviaDadosJSON = JSON.stringify(cardDataEnviaDados);

    const finalizedData = {
      ficha: fichaData,
      exercicio: cardDataEnviaDadosJSON
    };

    try {
      const response = await axios.post('http://localhost:3001/students/adicionarExercicioFichaAluno', {
        cardData: finalizedData,
      });
      if (response.data.message === 'OK') {
        toast.success('Ficha Cadastrada com sucesso!');
        setNameSheet('');
        setSelectedDateFinalizeSheet('');
        handleCloseNameSheet();
        setTimeout(() => {
          navigate(`/home`);
        }, 3500);
      } else {
        toast.error('Algo de errado aconteceu ao cadastrar a ficha, tente novamente.');
      }

    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
    }
  }
};