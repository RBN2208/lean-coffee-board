const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    color: {
      type: String,
      default: () => `hsl(${Math.round(Math.random() * 360)}, 70%, 60%)`,
    },
    role: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', schema)
