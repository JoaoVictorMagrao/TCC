const express = require('express');
const router = express.Router();
const professorController = require('./controller/teachers/index');
const alunosController = require('./controller/students/index');

router.post('/login', (req, res) => {
  professorController.login(req, res)
    .then(entity => {
      res.send(entity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/listaAlunos', async (req, res) => {
  try {
    const alunos = await alunosController.listaAluno();
    res.send(alunos);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;