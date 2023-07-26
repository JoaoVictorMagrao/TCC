require("dotenv").config();

const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
  } else {
    console.log('Conexão com o banco de dados estabelecida.')
  }
})

module.exports = db;
