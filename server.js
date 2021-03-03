const { v4: uuidv4 } = require('uuid');
const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose
.connect('mongodb://localhost/lean-coffee-board', {useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log('Connect to mongodb'))
.catch(error => console.log('Could not connect to mongodb', error))

const app = express()

let users = []

app.use(express.json())

app.get('/api/users', async (req, res) => {
    res.json(await User.find())
})

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    res.json(await User.findOne({id: id}))
})

app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    const index = users.findIndex(user => user.id === id)
    users = [...users.slice(0, index), ...users.slice(index +1)]
    res.json(users.find(user => user.id === id))
})

app.post('/api/users', async (req, res) => {
    res.json(await User.create(req.body))
})

app.get('/api/cards', (req, res) => {
    res.json([{ title: "Frist card"}])
})

app.listen(3000, () => {
    console.log('Server start at https://localhost:3000')
})