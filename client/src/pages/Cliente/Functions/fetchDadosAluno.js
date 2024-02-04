export async function fetchDadosAluno(idEditar, setValue) {
  try {
    const response = await fetch(`http://localhost:3001/students/listaAlunoUnico/${idEditar}`);
    const data = await response.json();

    setValue('nomeAluno', data.nome);
    setValue('emailAluno', data.email);
    setValue('cpfAluno', data.cpf);
    setValue('telefoneAluno', data.whatsapp_formatado);
    setValue('mensalidadeAluno', data.valor_mensal);
    setValue('dataVencimentoAluno', (data.data_vencimento == null) ? '' : data.data_vencimento.slice(0, 10));
    setValue('situacaoAluno', data.ativo);
    setValue('senhaAluno', data.senha);
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do aluno:', error);
    throw error;
  }
}