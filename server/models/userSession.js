const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  dateTime: {
    type: Date,
    default: Date.now()
  },
  isValid: {
    type: Number,
    default: false
  }
});

module.exports = mongoose.model('userSession', userSessionSchema);
