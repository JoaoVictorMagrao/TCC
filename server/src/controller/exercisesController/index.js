const db = require('../../config/index');

const controller = {
  listaGrupoMuscular: function () {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, descricao FROM grupo_muscular ORDER BY descricao',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  listaExercicios: function (idGrupoMuscular) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, descricao FROM exercicios where id_grupo_muscular = ? GROUP BY descricao ORDER BY descricao ',
        [idGrupoMuscular],
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