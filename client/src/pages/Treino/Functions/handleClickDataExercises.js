export const handleClickDataExercises = (tab, exercicioTreino, seriesExercicioPorAba, cargaTreinoPorAba, descansoTreinoPorAba, repeticoesTreinoPorAba, descricaoTreinoPorAba, idMuscleGroup, idExercicio, toast, setSeriesExercicioPorAba, setRepeticoesTreinoPorAba, setCargaTreinoPorAba, setDescansoTreinoPorAba, setDescricaoPorAba, setCardDataEnviaDados, setCardData) => {
  const trainingDay = {
    1: 'Treino G',
    2: 'Treino A',
    3: 'Treino B',
    4: 'Treino C',
    5: 'Treino D',
    6: 'Treino E',
    7: 'Treino F',
  };
  const trainingId = Object.keys(trainingDay).find((key) => trainingDay[key] === tab);

  const newCardData = {
    //[`exercicio${tab}`]: descricaoTreinoPorAba,     
    exercicioTreinoPorAba: exercicioTreino,
    seriesTreinoPorAba: seriesExercicioPorAba[`seriesExercicio-${tab}`],
    repeticoesTreinoPorAba: repeticoesTreinoPorAba[`repeticoesTreino-${tab}`],
    cargaTreinoPorAba: cargaTreinoPorAba[`cargaTreino-${tab}`],
    descansoTreinoPorAba: descansoTreinoPorAba[`descansoTreino-${tab}`],
    descricaoTreinoPorAba: descricaoTreinoPorAba[`descricaoTreino-${tab}`],
    diaDaSemanaPorAba: trainingId,
    idMuscleGroupPorAba: idMuscleGroup,
    idExercicioPorAba: idExercicio
    //  grupoMuscularPorAba: idMuscleGroup,
  };

  const condicaoSeries = (newCardData.seriesTreinoPorAba === '' || newCardData.seriesTreinoPorAba === undefined);
  const condicaoCarga = (newCardData.cargaTreinoPorAba === '' || newCardData.cargaTreinoPorAba === undefined);
  const condicaoDescanso = (newCardData.descansoTreinoPorAba === '' || newCardData.descansoTreinoPorAba === undefined);
  const condicaoRepeticoes = (newCardData.repeticoesTreinoPorAba === '' || newCardData.repeticoesTreinoPorAba === undefined);
  const verificaDiaSemana = newCardData.diaDaSemanaPorAba === undefined ? 1 : newCardData.diaDaSemanaPorAba;

  if (condicaoSeries || condicaoCarga || condicaoDescanso || condicaoRepeticoes) {
    toast.warning('Preencha todos os campos obrigatórios!!!');
  } else {
    toast.success(`Exercicío adicionado com sucesso ao ${tab}`);


    const transformedData = {
      [`exercicio${tab}`]: [
        {
          id_exercicio: newCardData.idExercicioPorAba,
          id_dia_treino: verificaDiaSemana,
          descricao: newCardData.descricaoTreinoPorAba,
          id_grupo_muscular: newCardData.idMuscleGroupPorAba,
          series: newCardData.seriesTreinoPorAba,
          carga: newCardData.cargaTreinoPorAba,
          descanso: newCardData.descansoTreinoPorAba,
          repeticoesTreino: newCardData.repeticoesTreinoPorAba,
          //  id_ficha: 1,
          // grupo_muscular: newCardData.grupoMuscularPorAba,
          exercicioTreino: newCardData.exercicioTreinoPorAba
        }
      ]
    };

    const transformedDataEnviarDados = {
      id_exercicio: newCardData.idExercicioPorAba,
      id_dia_treino: newCardData.diaDaSemanaPorAba,
      descricao: newCardData.descricaoTreinoPorAba,
      id_grupo_muscular: newCardData.idMuscleGroupPorAba,
      series: newCardData.seriesTreinoPorAba,
      carga: newCardData.cargaTreinoPorAba,
      descanso: newCardData.descansoTreinoPorAba,
      repeticoesTreino: newCardData.repeticoesTreinoPorAba,
      exercicioTreino: newCardData.exercicioTreinoPorAba
    };

    setSeriesExercicioPorAba('');
    setRepeticoesTreinoPorAba('');
    setCargaTreinoPorAba('');
    setDescansoTreinoPorAba('');
    setDescricaoPorAba('');

    setCardDataEnviaDados((prevCardData) => [...prevCardData, transformedDataEnviarDados]);
    setCardData((prevCardData) => [...prevCardData, transformedData]);
  }
};