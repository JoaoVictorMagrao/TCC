const db = require('../../config/index');

const controller = {
  listaFichasAluno: function (idAluno) {
 
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM fichas WHERE id_aluno = ? ORDER BY ativo DESC',
        [idAluno],
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
  listaTreinosAluno: function (idFicha) {
    return new Promise((resolve, reject) => {
      db.query(
        'select fi.id, fi.id_exercicio, fi.id_dia_treino, fi.id_grupo_muscular, fi.id_ficha from ficha_itens as fi inner join fichas f on(f.id = fi.id_ficha) inner join alunos as a on(f.id_aluno = a.id) inner join dia_semana as d on(d.id = fi.id_dia_treino) where f.id = ? group by d.id ORDER BY fi.id_dia_treino ASC',
        [idFicha],
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
  listaExerciciosTreino: function (idDiaTreino,idFicha) {
    return new Promise((resolve, reject) => {
      db.query(
        'select G.*, FI.* from ficha_itens FI INNER JOIN grupo_muscular G on(G.id = FI.id_grupo_muscular) where id_dia_treino = ? and id_ficha = ?',
        [idDiaTreino, idFicha],
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
  listaExercicioUnico: function (idDiaTreino,idFicha,idExercicio) {
    return new Promise((resolve, reject) => {
      db.query(
        'select FI.* , E.descricao  from ficha_itens FI INNER JOIN exercicios E on (FI.id_exercicio = E.id) where id_ficha = ? and id_exercicio = ? and id_dia_treino = ?',
        [idFicha, idExercicio, idDiaTreino],
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