const express = require('express');
const router = express.Router();
const teachersController = require('./controller/teachersController/index');
const exercisesController = require('./controller/exercisesController/index');
const studentsController = require('./controller/studentsController/index');
const mobileController = require('./controller/mobileController/index');
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

/*--------------- Rotas App ---------------*/

router.post('/mobile/login', (req, res) => {
  mobileController.loginAluno(req, res)
    .then(entity => {
      const data = {
        time: Date(),
        userId: entity.id,
      };

      res.send(entity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/mobile/listaFichasAluno/:id_aluno', async (req, res) => {
  const alunoId = req.params.id_aluno;

  try {
    const fichas = await mobileController.listaFichasAluno(alunoId);
    res.send(fichas);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/mobile/perfilAluno/:id_aluno', async (req, res) => {
  const alunoId = req.params.id_aluno;

  try {
    const perfil = await mobileController.perfilAluno(alunoId);
    res.send(perfil);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/mobile/listaTreinosAluno/:id_ficha', async (req, res) => {
  const fichaId = req.params.id_ficha;

  try {
    const fichas = await mobileController.listaTreinosAluno(fichaId);
    res.send(fichas);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/mobile/listaExerciciosTreino/:id_ficha', async (req, res) => {
  const fichaId = req.params.id_ficha;
  const diaTreinoId = req.params.id_dia_treino;

  try {
    const exercicios = await mobileController.listaExerciciosTreino(fichaId);
    res.send(exercicios);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/mobile/listaExercicioUnico/:id_dia_treino/:id_ficha/:id_exercicio', async (req, res) => {
  const fichaId = req.params.id_ficha;
  const diaTreinoId = req.params.id_dia_treino;
  const exercicioId = req.params.id_exercicio;


  try {
    const exercicios = await mobileController.listaExercicioUnico(diaTreinoId, fichaId, exercicioId);
    res.send(exercicios);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*--------------- FIM Rotas App ---------------*/


router.get('/students/listaAlunosFicha/:id_professor', async (req, res) => {
  const professorId = req.params.id_professor;

  try {
    const alunos = await studentsController.listaAlunosFicha(professorId);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/students/listaFichas/:idProfessor/:dataExpiracaoInicial/:dataExpiracaoFinal/:idAluno', async (req, res) => {
  try {
    const dataExpiracaoInicial = req.params.dataExpiracaoInicial;
    const dataExpiracaoFinal = req.params.dataExpiracaoFinal;
    const idAluno = req.params.idAluno;
    const idProfessor = req.params.idProfessor;

    const fichas = await studentsController.listaFichas(idProfessor, dataExpiracaoInicial, dataExpiracaoFinal, idAluno);
    res.json(fichas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/students/listaAlunos/:id_professor/:situacao/:nome', async (req, res) => {
  const professorId = req.params.id_professor;
  const situacao = req.params.situacao;
  const nome = req.params.nome;
  try {
    const alunos = await studentsController.listaAluno(professorId, situacao, nome);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/students/listaValoresAlunos/:id_professor/:data_inicio/:data_fim/:ordem', async (req, res) => {
  const professorId = req.params.id_professor;
  const dataInicio = req.params.data_inicio;
  const dataFim = req.params.data_fim;
  const ordem = req.params.ordem;
  try {
    const alunos = await studentsController.listaValoresAlunos(professorId, dataInicio, dataFim, ordem);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/students/treinoAtivoAluno/:idProfessor/:idAluno', async (req, res) => {
  const professorId = req.params.idProfessor;
  const alunoId = req.params.idAluno;
  try {
    const TreinoAluno = await studentsController.treinoAtivoAluno(professorId, alunoId);
    res.send(TreinoAluno);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post('/students/adicionarExercicioFichaAluno', async (req, res) => {
  try {

    const data = { id_exercicio, id_dia_treino, descricao, id_grupo_muscular, series, carga, descanso, id_professor, id_aluno, nome_ficha, ativo, data_criacao, data_final } = req.body;
    await studentsController.adicionarExercicioFichaAluno(data);
    res.status(200).json({ message: 'OK' });

  } catch (error) {
    console.error('Erro ao cadastrar ficha:', error);
    res.status(500).json({ error: 'Erro' });

  }
});
router.post('/students/adicionarAluno', async (req, res) => {
  try {

    const { nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento, img } = req.body;
    //console.log('Dados recebidos:', req.body);

    await studentsController.adicionarAluno({ nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento, img });

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

router.get('/students/listaAlunoUnico/:id', async (req, res) => {
  const alunoId = req.params.id;
  try {
    const alunos = await studentsController.listaAlunoUnico(alunoId);
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/students/updateAluno/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, senha, cpf, email, whatsapp, valor_mensal, ativo, data_vencimento } = req.body;

  try {
    await studentsController.updateAluno(id, nome, email, senha, cpf, whatsapp, valor_mensal, ativo, data_vencimento);
    res.send('OK');
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.delete('/students/excluirAluno/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await studentsController.excluirAluno(id);
    res.send('OK');
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.post('/teachers/login', (req, res) => {
  teachersController.login(req, res)
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

router.get('/exercises/listaExercicios/:idGrupoMuscular', async (req, res) => {
  try {
    const { idGrupoMuscular } = req.params;
    const exercicios = await exercisesController.listaExercicios(idGrupoMuscular);
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/exercises/listaGrupoMuscular', async (req, res) => {
  try {
    const grupoMuscular = await exercisesController.listaGrupoMuscular();
    res.json(grupoMuscular);
  } catch (error) {
    res.status(500).json({ error: 'Erro' });
  }
});

module.exports = router;