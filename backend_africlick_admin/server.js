const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(3000, () => console.log('✅ Serveur sur port 3000'));
  })
  .catch(err => console.error('Erreur MongoDB', err));
app.use('/api/payment', require('./routes/payment'));

app.use('/api/history', require('./routes/history'));

app.use('/api/games', require('./routes/games'));

app.use('/api/admin', require('./routes/admin'));
