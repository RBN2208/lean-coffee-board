const express = require('express')
const setupMongo = require('./setupMongo')
require('dotenv').config()
const { PORT = 4000 } = process.env

setupMongo()
const app = express()

app.use('/', express.json()) // add middleware for json data
app.use(express.static('./client/build'))
app.use('/api/users', require('./routes/users'))
app.use('/api/cards', require('./routes/cards'))
app.use(require('./routes/error'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
