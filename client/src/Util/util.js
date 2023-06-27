import * as yup from 'yup';
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