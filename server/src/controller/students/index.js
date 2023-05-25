const db = require('../../config/index');

const controller = {
  listaAluno: function (req, res) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, nome, email, whatsapp, fu_formata_whatsapp(id, whatsapp) whatsapp_formatado, valor_mensal, ativo, data_vencimento FROM alunos',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
    });
  },
  cadastrarAluno: function (aluno) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO alunos (nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [aluno.nome, '1234567', '461.999.454-45', aluno.email, aluno.whatsapp, aluno.valor_mensal, '1', '2', aluno.ativo, aluno.data_vencimento],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = controller;