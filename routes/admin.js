const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Retrait = require('../models/Retrait');
const Transaction = require('../models/Transaction');
const GameLog = require('../models/GameLog');
const router = express.Router();

const ADMIN_EMAIL = "admin@africlick.com";
const ADMIN_PASSWORD = "Admin2024"; // à modifier après premier déploiement
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Middleware admin auth
const adminAuth = (req, res, next) => {
  const token = req.header('x-admin-token');
  if (!token) return res.status(401).json({ msg: 'Non autorisé' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') throw Error();
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalide' });
  }
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ msg: 'Identifiants invalides' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/transactions', adminAuth, async (req, res) => {
  const txns = await Transaction.find().sort({ createdAt: -1 });
  res.json(txns);
});

router.get('/games', adminAuth, async (req, res) => {
  const games = await GameLog.find().sort({ createdAt: -1 });
  res.json(games);
});

router.get('/retraits', adminAuth, async (req, res) => {
  const retraits = await Retrait.find().sort({ createdAt: -1 });
  res.json(retraits);
});

router.post('/retraits/:id/valider', adminAuth, async (req, res) => {
  const retrait = await Retrait.findById(req.params.id);
  if (!retrait || retrait.statut !== 'en attente') return res.status(400).json({ msg: 'Invalide' });
  retrait.statut = 'validé';
  await retrait.save();
  res.json({ msg: 'Retrait validé' });
});

router.post('/retraits/:id/rejeter', adminAuth, async (req, res) => {
  const retrait = await Retrait.findById(req.params.id);
  if (!retrait || retrait.statut !== 'en attente') return res.status(400).json({ msg: 'Invalide' });
  retrait.statut = 'rejeté';
  await retrait.save();
  const user = await User.findById(retrait.userId);
  user.solde += retrait.montant;
  await user.save();
  res.json({ msg: 'Retrait rejeté et remboursé' });
});

module.exports = router;