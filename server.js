const express = require('express')

const app = express()

app.use('/api/users', (req, res) => {
    res.end('Users')
})

app.use('/api/cards', (req, res) => {
    res.end('Cards')
})

app.listen(3000, () => {
    console.log('Server start at https://localhost:3000')
})