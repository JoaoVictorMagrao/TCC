import { getStudentRecords } from '../../../services/StudentsServices';

export async function fetchDataStudens(idTeacher, setLoading, setSheet) {
  try {
    const data = await getStudentRecords(idTeacher, 0, 0, 0);
    setSheet(data);
    setLoading(false);
  } catch (error) {
    console.error('Erro ao listar os alunos', error);
    setLoading(false);
  }
}