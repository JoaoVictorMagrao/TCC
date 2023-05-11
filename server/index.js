const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/routes');

//npm run devStart

app.use(express.json())
app.use(cors())
app.use(router);


app.listen(3001, () => {
  console.log('Rodando na porta 3001')
})
