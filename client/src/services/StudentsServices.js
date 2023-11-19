import axios from 'axios';

export const fetchAlunos = (idTeacher, situation, name, setStudents) => {
  let checkName = (name == '') ? 0 : name;
  axios.get(`http://localhost:3001/listaAlunos/${idTeacher}/${situation}/${checkName}`)
    .then((response) => {
      setStudents(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchStudentsPrinter = (idTeacher, situation) => {
  return axios.get(`http://localhost:3001/listaAlunos/${idTeacher}/${situation}/0`);
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

export const fetchValuesStudents = async (idTeacher, startDate, endDate, order) => {
  const response = await axios.get(`http://localhost:3001/listaValoresAlunos/${idTeacher}/${startDate}/${endDate}/${order}`);
  return response.data;
}

export const fetchGrupoMuscular = async (setGrupoMuscularOptions) => {
  try {
    const response = await axios.get('http://localhost:3001/listaGrupoMuscular');
    const listaGrupoMuscular = response.data;
    
    setGrupoMuscularOptions(listaGrupoMuscular);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

