const express = require('express');
const router = express.Router();
const professorController = require('./controller/teachers/index');
const alunosController = require('./controller/students/index');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();



router.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

// router.get("/user/validateToken", (req, res) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//       const token = req.header(tokenHeaderKey);
//   console.log(token);
 
//       const verified = jwt.verify(token, jwtSecretKey)

//       if(verified){
//           return res.send("Successfully Verified");
//       }else{
//           // Access Denied
//           return res.status(401).send(error);
//       }
//   } catch (error) {
//       // Access Denied
//       return res.status(401).send(error);
//   }
// });

router.post('/login', (req, res) => {
  professorController.login(req, res)
    .then(entity => {
       const data = {
        time: Date(),
        userId: entity.id,
      };

      const jwtSecretKey = process.env.JWT_SECRET_KEY;

      const token = jwt.sign(data, jwtSecretKey);
      entity.token = token;
      res.send(entity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/listaAlunos/:id_professor', async (req, res) => {
  const professorId = req.params.id_professor;
  try {
    const alunos = await alunosController.listaAluno(professorId);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post('/adicionarExercicioFichaAluno', async (req, res) => {
  try {

    const data = { id_exercicio, id_dia_treino, descricao, id_grupo_muscular, series, carga, descanso, id_professor, id_aluno, nome_ficha, ativo, data_criacao, data_final } = req.body;   
    await alunosController.adicionarExercicioFichaAluno(data);
    res.status(200).json({ message: 'OK' });

  } catch (error) {
    console.error('Erro ao cadastrar ficha:', error);
    res.status(500).json({ error: 'Erro' });

  }
});
router.post('/adicionarAluno', async (req, res) => {
    try {

      const { nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento, img } = req.body;   
      //console.log('Dados recebidos:', req.body);

      await alunosController.adicionarAluno({ nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento, img });
      
      res.status(200).json({ message: 'OK' });
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'CPF já cadastrado' });
      } else {
        res.status(500).json({ error: 'Erro' });
      }
    }
});

router.get('/listaAlunoUnico/:id', async (req, res) => {
  const alunoId = req.params.id;
  try {
    const alunos = await alunosController.listaAlunoUnico(alunoId);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/updateAluno/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, senha, cpf, email, whatsapp, valor_mensal, ativo, data_vencimento } = req.body;   

  try {
    await alunosController.updateAluno(id, nome, email, senha, cpf, whatsapp, valor_mensal, ativo, data_vencimento);
    res.send('OK');
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.delete('/excluirAluno/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await alunosController.excluirAluno(id);
    res.send('OK');
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/listaExercicios/:idGrupoMuscular', async (req, res) => {
  try {
    const { idGrupoMuscular } = req.params;
    const exercicios = await alunosController.listaExercicios(idGrupoMuscular);
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/listaGrupoMuscular', async (req, res) => {
  try {
    const grupoMuscular = await alunosController.listaGrupoMuscular();
    res.json(grupoMuscular);
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});


module.exports = router;