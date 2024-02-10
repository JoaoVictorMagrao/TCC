export const searchExercisesMuscleGroup = async (idMuscleGroup, setExerciciosOptions, axios) => {
  try {
    const response = await axios.get(`http://localhost:3001/exercises/listaExercicios/${idMuscleGroup}`);
    const listExercises = response.data;
    setExerciciosOptions(listExercises);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};