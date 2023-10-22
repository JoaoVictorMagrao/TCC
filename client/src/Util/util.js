import * as yup from 'yup';
import axios from 'axios';
//import { useState } from 'react';

export const formatCnpjCpf = function (value) {
  const cnpjCpf = value.replace(/\D/g, '')

  if(cnpjCpf.length === 11){
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }
  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3-$4')
}

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
}

export function formatCurrency(number) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const validationPost = yup.object().shape({
  nomeAluno: yup
    .string()
    .required('O nome é obrigatório')
    .max(40, 'O título precisa ter no maximo 255 caracteres'),
  emailAluno: yup
    .string()
    .required('O email é obrigatório')
    .max(180, 'O email precisa ter no maximo 180 caracteres')
    .email('O texto informado não é um email'),
  cpfAluno: yup.string().required('O CPF é obrigatório').min(14, 'CPF incompleto'),
  telefoneAluno: yup
    .string()
    .required('O telefone é obrigatório')
    .min(14, 'O numero de telefone precisa ter pelo menos 9 caracteres'),
  //mensalidadeAluno: yup.string().required("O valor é obrigatório").max(13, "O valor não pode ser maior que 100,000.00"),
  dataVencimentoAluno: yup.date().required('A data de vencimento é obrigatória'),
  situacaoAluno: yup.string().required('A situação é obrigatório'),
  senhaAluno: yup.string().required('A senha é obrigatório'),
});


export const getDayOfWeek = (selectedOptions) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return selectedOptions.map((option) => daysOfWeek[parseInt(option) - 1]);
};

// export const getDadosAluno = async (idStudent, setNomeAluno, setTelefoneAluno, setMensalidadeAluno) => {
//   console.log(idStudent);
//   const response = await fetch(`http://localhost:3001/listaAlunoUnico/${idStudent}`);
//   const data = await response.json();
//   setNomeAluno(data.nome);
//   setTelefoneAluno(data.whatsapp);
//   setMensalidadeAluno(data.valor_mensal);
//   // setImgAluno(data.img);
// };

export const fetchGrupoMuscular = async (setGrupoMuscularOptions) => {
  try {
    const response = await axios.get('http://localhost:3001/listaGrupoMuscular');
    const listaGrupoMuscular = response.data;
    
    setGrupoMuscularOptions(listaGrupoMuscular);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

export const allowAlphanumericAndSpaces = (value) => {
  const regex = /^[a-zA-Z0-9\s]*$/;
  return regex.test(value);
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adicionando 1, pois os meses começam em 0
  const day = String(currentDate.getDate()).padStart(2, '0');

  const data_criacao = `${year}-${month}-${day}`;

  return data_criacao;
};

export const formatarData = (data) =>{
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // O mês é base 0, então somamos 1.
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}