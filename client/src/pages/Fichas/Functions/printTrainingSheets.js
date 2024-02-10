import { getStudentRecords } from '../../../services/StudentsServices';

export const printTrainingSheets = async (selectedDateStartPrint, selectedDateEndPrint, selectedIdStudent, toast, idTeacher, fichasPDF, setSheet, setLoading) => {

  const checkDataStart = (selectedDateStartPrint == '') ? 0 : selectedDateStartPrint;
  const checkDataEnd = (selectedDateEndPrint == '') ? 0 : selectedDateEndPrint;
  const checkIdStudent = (selectedIdStudent == '') ? 0 : selectedIdStudent;

  if (checkDataEnd < checkDataStart) {
    toast.warning('A data inicial não pode ser maior que a data final.');
  } else {
    const data = await getStudentRecords(idTeacher, checkDataEnd, checkDataStart, checkIdStudent);
    fichasPDF(data);
    setSheet(data);
    setLoading(false);
  }
};