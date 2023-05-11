const mysql = require('mysql');

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

module.exports = db;
