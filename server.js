const { v4: uuidv4 } = require('uuid');
const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/User');
const Card = require('./models/Card');

mongoose
.connect('mongodb://localhost/lean-coffee-board', {useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log('Connect to mongodb'))
.catch(error => console.log('Could not connect to mongodb', error))

const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
    res.json(await User.find())
})

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    res.json(await User.findOne({id: id}))
})

app.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params
    res.json(await User.deleteOne({ id }))
})

app.post('/api/users', async (req, res) => {
    res.json(await User.create(req.body))
})

//

app.get('/api/cards', async (req, res) => {
    res.json(await Card.find())
})

app.get('/api/cards/:id', async (req, res) => {
    const { id } = req.params
    res.json(await Card.findOne({id: id}))
})

app.delete('/api/cards/:id', async (req, res) => {
    const {id} = req.params
    res.json(await Card.deleteOne({ id }))
})

app.post('/api/cards', async (req, res) => {
    res.json(await Card.create(req.body))
})




app.get('/api/cards', (req, res) => {
    res.json([{ title: "Frist card"}])
})

app.listen(3000, () => {
    console.log('Server start at https://localhost:3000')
})

function getUserWithPosts(author){
    return User.findOne({ author: author })
      .populate('Cards').exec((err, text) => {
        console.log("Populated User " + text);
      })
  }