const express = require('express')
require('dotenv').config()
const { PORT = 4000 } = process.env

const app = express()

app.use(express.static('./client/build'))
app.use('/strapi', express.static('./strapi/build'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
