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