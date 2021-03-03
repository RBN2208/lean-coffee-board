const express = require('express')
const { v4 } = require('uuid')
const mongoose = require('mongoose')
const User = require('./models/User')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

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

app.get('/api/users', async (req, res) => {
  // with then:
  // User.find().then(users => res.json(users))

  // with async/await
  res.json(await User.find())
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  res.json(await User.findOne({ id }))
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  users = users.filter(user => user.id !== id)
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  res.json(await User.create(req.body))
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
