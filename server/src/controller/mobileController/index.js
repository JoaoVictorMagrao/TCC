const db = require('../../config/index');

const controller = {
  loginAluno: function (req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    return new Promise((resolve, reject) => {
      db.query(
        'SELECT A.id, A.nome, A.senha, A.email, F.id as id_ficha FROM alunos as A INNER JOIN fichas as F ON A.id = F.id_aluno where A.email = ? AND A.senha = ? AND F.ativo = 1',
        [email, senha],
        (err, result) => {
          if (err) {
            reject(err);
          }
          console.log(result);
          if (result.length > 0) {
            const aluno = {
              msg: 'OK',
              user: {
                id: result[0].id,
                nome: result[0].nome,
                senha: result[0].senha,
                email: result[0].email,
                id_ficha: result[0].id_ficha
              } 
            };
            resolve(aluno);
          } else {
            resolve({msg: 'ERROR'});
          }
        }
      )
    });
  },
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
  listaExerciciosTreino: function (idFicha) {
    return new Promise((resolve, reject) => {
      db.query(
        'select FI.id_dia_treino, E.descricao as exercicio, FI.id from ficha_itens FI INNER JOIN exercicios E ON(FI.id_exercicio = e.id) where id_ficha = ? group by E.descricao order by FI.id_dia_treino asc',
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