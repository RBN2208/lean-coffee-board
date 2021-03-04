const express = require('express')
const mongoose = require('mongoose')
const Card = require('./models/Card')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

const app = express()

app.use(express.json()) // add middleware for json data

app.use('/api/users', require('./routes/users'))

app.get('/api/cards', async (req, res, next) => {
  res.json(await Card.find().populate('author').catch(next))
})

app.get('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findById(id).populate('author').catch(next))
})

app.patch('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(
    await Card.findByIdAndUpdate(id, req.body, { new: true }).catch(next)
  )
})

app.delete('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findByIdAndDelete(id).catch(next))
})

app.post('/api/cards', async (req, res, next) => {
  res.json(await Card.create(req.body).catch(next))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.json({ error: err.message })
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
