export function removeExercise(tab, id_exercicio, cardData, cardDataEnviaDados, setCardDataEnviaDados, setCardData) {

  const updatedCardData = cardData.filter((card) => {
    if (card[`exercicio${tab}`]) {
      return card[`exercicio${tab}`].every((exercise) => exercise.id_exercicio !== id_exercicio);
    }
    return true;
  });

  const updatedCardDataEnviaDados = cardDataEnviaDados.filter(
    (exercise) => exercise.id_exercicio !== id_exercicio
  );

  setCardDataEnviaDados(updatedCardDataEnviaDados);
  setCardData(updatedCardData);
}