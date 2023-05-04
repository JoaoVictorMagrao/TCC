const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
// const bcrypt = require('bcrypt')

//npm run devStart
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'banco_tcc',
})

db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
  } else {
    console.log('Conexão com o banco de dados estabelecida.')
  }
})

app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
  const email = req.body.email
  const senha = req.body.senha

  db.query(
    'SELECT * FROM professores where email = ? AND senha = ? AND id_tipo_usuario = ?',
    [email, senha, 1],
    (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result.length > 0) {
        res.send({ msg: 'OK' })
      } else {
        res.send({ msg: 'ERROR' })
      }
    }
  )
})

app.listen(3001, () => {
  console.log('Rodando na porta 3001')
})
