const mongoose = require('mongoose');

const GameLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game: String,
  bet: Number,
  win: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameLog', GameLogSchema);