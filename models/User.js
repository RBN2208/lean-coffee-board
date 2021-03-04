const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    role: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', schema)
