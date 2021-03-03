const express = require('express')
const { v4 } = require('uuid')

const app = express()

let users = []

app.use(express.json()) // add middleware for json data

/*

req -> express -> middleware -> middleware -> middleware

middleware = (req, res, next) => { }

app.use((req, res, next) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    res.json(users)
  } else {
    next()
  }
})
*/

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  res.json(users.find(user => user.id === id))
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  users = users.filter(user => user.id !== id)
  res.json(users)
})

app.post('/api/users', (req, res) => {
  // exercise: add id (via uuid) for each new user
  const newUser = { ...req.body, id: v4() }
  users.push(newUser)
  res.json(newUser)
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
