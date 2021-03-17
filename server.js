const express = require('express')
require('dotenv').config()
const { PORT = 3000 } = process.env

const app = express()

app.use(express.static('./client/build'))
app.use('/storybook', express.static('./client/storybook-static'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
