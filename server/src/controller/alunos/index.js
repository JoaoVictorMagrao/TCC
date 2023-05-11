
controller = {
  listaAluno: function (req, res) {
    const email = req.body.email
    const senha = req.body.senha

    let entity = {};
  
    db.query(
      'SELECT * FROM professores where email = ? AND senha = ? AND id_tipo_usuario = ?',
      [email, senha, 1],
      (err, result) => {
        if (err) {
          entity = err;
        }
        if (result.length > 0) {
          entity = {msg: 'OK'};
        } else {
          entity = {msg: 'ERROR'};
        }
      }
    )
    return entity;
  },
  envioProfessor: function() {
    
  }
}

module.exports = controller;