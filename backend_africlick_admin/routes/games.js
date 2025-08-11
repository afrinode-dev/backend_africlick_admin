const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const GameLog = require('../models/GameLog');
const router = express.Router();

// Simuler un jeu avec mise et gain
router.post('/play', auth, async (req, res) => {
  const { game, bet } = req.body;
  if (!game || !bet || bet <= 0) return res.status(400).json({ msg: 'Jeu ou mise invalide' });

  const user = await User.findById(req.user.id);
  if (!user || user.solde < bet) return res.status(400).json({ msg: 'Solde insuffisant' });

  // Simuler gain aléatoire
  const win = Math.random() < 0.5 ? 0 : bet * 2;

  // Mise à jour solde
  user.solde = user.solde - bet + win;
  await user.save();

  // Enregistrer la partie
  await GameLog.create({ userId: req.user.id, game, bet, win });

  res.json({ msg: 'Partie jouée', solde: user.solde, win });
});

module.exports = router;