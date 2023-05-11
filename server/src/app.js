const express = require('express')
const app = express()
const usersRoutes = require('./routes/users');

const cors = require('cors')

app.use(express.json())
app.use(cors())

app.post('/login', login)
module.exports = app;