const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    text: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    date: { 
        type: Date, 
        default: Date.now,
    },
}, {versionKey: false})

module.exports = mongoose.model('Card', cardSchema)
