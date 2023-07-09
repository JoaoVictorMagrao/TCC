const express = require('express');
const router = express.Router();
const professorController = require('./controller/teachers/index');
const alunosController = require('./controller/students/index');
const path = require('path');


router.post('/login', (req, res) => {
  professorController.login(req, res)
    .then(entity => {
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

router.get('/listaExercicios', async (req, res) => {
  try {
    const exercicios = await alunosController.listaExercicios();
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