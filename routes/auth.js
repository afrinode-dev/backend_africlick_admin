const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: 'Email déjà utilisé' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash, username });
    await newUser.save();

    res.status(201).json({ msg: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, solde: user.solde } });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

module.exports = router;