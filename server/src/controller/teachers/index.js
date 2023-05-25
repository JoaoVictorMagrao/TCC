const db = require('../../config/index');
const controller = {
  login: function (req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM professores where email = ? AND senha = ? AND id_tipo_usuario = ?',
        [email, senha, 1],
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.length > 0) {
            resolve({msg: 'OK'});
          } else {
            resolve({msg: 'ERROR'});
          }
        }
      )
    });
  }
}

module.exports = controller;