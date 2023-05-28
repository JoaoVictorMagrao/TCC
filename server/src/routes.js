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

router.post('/adicionarAluno', async (req, res) => {
    try {
      const { nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento } = req.body;   
      console.log('Dados recebidos:', req.body);
      await alunosController.adicionarAluno({ nome, senha, cpf, email, whatsapp, valor_mensal, id_professor, id_tipo_usuario, ativo, data_vencimento });

      console.log('Aluno cadastrado com sucesso');

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


module.exports = router;