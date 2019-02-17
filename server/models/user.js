const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dob: {
    type: String
  },
  email: {
    type: String
  },
  country: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  }
});

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

userSchema.methods.validPassword = (loginPassword, savedPassword) => bcrypt.compareSync(loginPassword, savedPassword)

module.exports = mongoose.model('User', userSchema)
