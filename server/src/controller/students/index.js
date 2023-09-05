const db = require('../../config/index');

const controller = {
  listaAluno: function (idProfessor) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, nome, email, whatsapp, fu_formata_whatsapp(id, whatsapp) whatsapp_formatado, valor_mensal, ativo, data_vencimento FROM alunos  WHERE id_professor = ?',
        [idProfessor],
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
  adicionarAluno: function (aluno) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO alunos (nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento, img) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [aluno.nome, aluno.senha, aluno.cpf, aluno.email, aluno.whatsapp, aluno.valor_mensal, aluno.id_professor, aluno.id_tipo_usuario, aluno.ativo, aluno.data_vencimento, aluno.img],
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
  listaAlunoUnico: function (alunoId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, nome, email, senha, cpf, whatsapp, fu_formata_whatsapp(id, whatsapp) whatsapp_formatado, valor_mensal, ativo, data_vencimento, img FROM alunos WHERE id = ?',
        [alunoId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      )
    });
  },
  updateAluno: function (alunoId, nome, email, senha, cpf, whatsapp, valorMensal, ativo, dataVencimento) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE alunos SET nome = ?, email = ?, senha = ?, cpf = ?, whatsapp = ?, valor_mensal = ?, ativo = ?, data_vencimento = ? WHERE id = ?',
        [nome, email, senha, cpf, whatsapp, valorMensal, ativo, dataVencimento, alunoId],
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
  excluirAluno: function (alunoId) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM alunos where id = ?',
        [alunoId],
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
        'SELECT id, descricao FROM exercicios where id_grupo_muscular = ? ORDER BY descricao ',
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
  },
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
   }
  ,adicionarExercicioFichaAluno: function (cardData) {
   //console.log(cardData);
   const dataSheet = cardData.cardData.ficha;
   const dataExercise = cardData.cardData.exercicio;

    try {  
      var sql = "INSERT INTO fichas (id_professor, id_aluno, nome_ficha, ativo, data_criacao, data_final) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [dataSheet.id_professor, dataSheet.id_aluno, dataSheet.nome_ficha,dataSheet.ativo, dataSheet.data_criacao, dataSheet.data_final], function (err, result) {
        if (err) throw err;
    
      // cardData.map(() => {
      //   console.log(cardData.descricao);
      // })

      console.log(dataExercise);
      const dataArray = Object.entries(dataExercise).map(([key, value]) => ({
        descricao: key,
        valor: value,
      }));
console.log('--------------------------------------');
      for (const exercicio of JSON.parse(dataExercise)) {
        console.log(exercicio);
        db.query(
          'INSERT INTO ficha_itens (id_exercicio, id_dia_treino, descricao, id_grupo_muscular, series, carga, descanso, id_ficha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            exercicio.id_exercicio,
            exercicio.id_dia_treino, 
            exercicio.descricao,
            exercicio.id_grupo_muscular, 
            exercicio.series, 
            exercicio.carga, 
            exercicio.descanso,
            result.insertId,
          ],
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
        );
      }
      });
    
      // Se quiser, pode retornar alguma mensagem ou resultado após o término da consulta
      return 'Itens adicionados com sucesso';
    } catch (error) {
      throw error;
    }
  }
  

}

module.exports = controller;