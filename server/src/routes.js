const express = require('express');
const router = express.Router();
const professorController = require('./controller/professores/index');

router.post('/login', (req, res) => {
  professorController.login(req, res)
    .then(entity => {
      res.send(entity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;