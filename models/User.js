const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solde: { type: Number, default: 1000 },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);