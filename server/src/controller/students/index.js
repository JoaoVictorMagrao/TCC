const db = require('../../config/index');

const controller = {
  listaAluno: function (req, res) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, nome, email, whatsapp, valor_mensal, ativo, data_vencimento FROM alunos',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
    });
  }
}

module.exports = controller;