const express = require('express')

const app = express()

app.get('/api/users', (req, res) => {
  res.json([{ name: 'Melissa', role: 'student' }])
})

app.post('/api/users', (req, res) => {
  res.json({ message: 'This was a post request' })
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
