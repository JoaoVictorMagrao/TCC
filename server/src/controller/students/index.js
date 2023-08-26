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
   
   const dataFicha = cardData.ficha;
    try {  
      var sql = "INSERT INTO fichas (id_professor, id_aluno, nome_ficha, ativo, data_criacao, data_final) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [dataFicha.id_professor, dataFicha.id_aluno, dataFicha.nome_ficha,dataFicha.ativo, dataFicha.data_criacao, dataFicha.data_final], function (err, result) {
        if (err) throw err;
   
        // Usando os valores do objeto cardData
      // cardData.map(() => {
      //   console.log(cardData.descricao);
      // })
      const dataArray = Object.entries(cardData.exercicio).map(([key, value]) => ({
        descricao: key,
        valor: value,
      }));

      for (const itemFicha of dataArray) {
        //console.log(itemFicha.valor.descricao);
        db.query(
          'INSERT INTO ficha_itens (id_exercicio, id_dia_treino, descricao, id_grupo_muscular, series, carga, descanso, id_ficha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            itemFicha.valor.id_exercicio, // Assuming id_exercicio or id_dia_treino should be from cardData
            itemFicha.valor.id_dia_treino, // Assuming id_exercicio or id_dia_treino should be from cardData
            itemFicha.valor.descricao,
            itemFicha.valor.id_grupo_muscular, // Assuming id_grupo_muscular should be from cardData
            itemFicha.valor.series, // Assuming series should be from cardData
            itemFicha.valor.carga, // Assuming carga should be from cardData
            itemFicha.valor.descanso, // Assuming descanso should be from cardData
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