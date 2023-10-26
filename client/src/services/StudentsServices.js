import axios from 'axios';

export const fetchAlunos = (idTeacher, situation, setStudents) => {
  axios.get(`http://localhost:3001/listaAlunos/${idTeacher}/${situation}`)
    .then((response) => {
      setStudents(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchStudentsPrinter = (idTeacher, situation) => {
  return axios.get(`http://localhost:3001/listaAlunos/${idTeacher}/${situation}`);
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

export const getStudentRecords = async (idTeacher, StartExpirationDate, endExpirationDate, idStudent) => {
  const response = await axios.get(`http://localhost:3001/listaFichas/${idTeacher}/${endExpirationDate}/${StartExpirationDate}/${idStudent} `);
  return response.data;
}

export const searchStudents = async (idTeacher) => {
  const response = await axios.get(`http://localhost:3001/listaAlunosFicha/${idTeacher}`);
  return response.data;
}

export const searchStudentTraining = async (idToken) => {
  const response = await axios.get(`http://localhost:3001/listaExerciciosTreino/${idToken}`);
  return response.data;
}

export const fetchGeneralInformation = async (idTeacher) => {
  const response = await axios.get(`http://localhost:3001/somaValoresAlunos/${idTeacher}`);
  return response.data;
}


