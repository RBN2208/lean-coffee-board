const express = require('express')

const app = express()

app.use('/api/users', (req, res) => {
  res.end('[{"name": "Melissa", "role": "student"}]')
})

app.use('/api/cards', (req, res) => {
  res.end('[{"title": "First card"}]')
})


app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
