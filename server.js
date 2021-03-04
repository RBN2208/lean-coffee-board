const express = require('express')
const mongoose = require('mongoose')
const Card = require('./models/Card')
const User = require('./models/User')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

const app = express()

app.use(express.json()) // add middleware for json data

app.get('/api/users', async (req, res) => {
  res.json(await User.find())
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  res.json(await User.findOne({ id }))
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params
  res.json(await User.deleteOne({ id }))
})

app.post('/api/users', async (req, res) => {
  res.json(await User.create(req.body))
})

app.get('/api/cards', async (req, res) => {
  res.json(await Card.find().populate('author'))
})

app.get('/api/cards/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Card.findOne({ id }).populate('author'))
})

app.delete('/api/cards/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Card.deleteOne({ id }))
})

app.post('/api/cards', async (req, res) => {
  res.json(await Card.create(req.body))
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
