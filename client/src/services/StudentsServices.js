import axios from 'axios';

export const fetchAlunos = (idTeacher, setData) => {
  axios.get(`http://localhost:3001/listaAlunos/${idTeacher}`)
    .then((response) => setData(response.data))
    .catch((error) => console.log(error));
};

export const excluirAluno = async (alunoId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/excluirAluno/${alunoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const singleStudentList = (idStudents, setDataSingleStudents) => {
  axios.get(`http://localhost:3001/listaAlunoUnico/${idStudents}`)
    .then((response) => {
      setDataSingleStudents(response.data);
    })
    .catch((error) => console.log(error));
};


