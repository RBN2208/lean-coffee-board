const { v4: uuidv4 } = require('uuid');
const express = require('express')
const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost/lean-coffee-board', {useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log('Connect to mongodb'))
.catch(error => console.log('Could not connect to mongodb', error))

const app = express()

app.use(express.json())

app.use('/api/users', require('./routes/users'))

app.use('/api/cards', require('./routes/cards'))

app.use((err,req,res,next) => {
    console.log(err.message)
    res.json({error: err.message})
})

app.listen(3000, () => {
    console.log('Server start at https://localhost:3000')
})
