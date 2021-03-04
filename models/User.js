const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: String,
    role: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', schema)
