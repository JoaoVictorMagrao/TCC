import * as yup from 'yup';

//import { useState } from 'react';

export const formatCnpjCpf = function (value) {
  const cnpjCpf = value.replace(/\D/g, '')

  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }
  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3-$4')
}

export function validateCPF(cpf) {

  const cpfLimpo = cpf.replace(/[^\d]/g, '');

  if (cpfLimpo.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) {
    digito1 = 0;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) {
    digito2 = 0;
  }

  if (parseInt(cpfLimpo.charAt(9)) !== digito1 || parseInt(cpfLimpo.charAt(10)) !== digito2) {
    return false;
  }

  return true;
}
export function formatPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
}

export function formatCurrency(number) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const imageToDataUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

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

export const formatarData = (data) => {
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // O mês é base 0, então somamos 1.
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}