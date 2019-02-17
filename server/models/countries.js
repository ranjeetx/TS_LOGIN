const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  value: {
    type: String
  }
});

module.exports = mongoose.model('countries', countriesSchema);
