const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model('skills', skillsSchema);