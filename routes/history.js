const express = require('express');
const auth = require('../middleware/auth');
const GameLog = require('../models/GameLog');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/games', auth, async (req, res) => {
  const logs = await GameLog.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(logs);
});

router.get('/transactions', auth, async (req, res) => {
  const txns = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(txns);
});

module.exports = router;