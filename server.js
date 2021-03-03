const { v4: uuidv4 } = require('uuid');
const express = require('express')

const app = express()

let users = []

const middleware = express.json()

app.use(middleware)

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    res.json(users.find(user => user.id === id))
})

app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    const index = users.findIndex(user => user.id === id)
    users = [...users.slice(0, index), ...users.slice(index +1)]
    res.json(users.find(user => user.id === id))
})

app.post('/api/users', (req, res) => {
    const newUser = {...req.body, id: uuidv4()}
    users.push(newUser)
    res.json(newUser)
})

app.get('/api/cards', (req, res) => {
    res.json([{ title: "Frist card"}])
})

app.listen(3000, () => {
    console.log('Server start at https://localhost:3000')
})