import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
import Recharge from './pages/Recharge';
import Retirer from './pages/Retirer';
<Route path="/recharge" element={<Recharge />} />
<Route path="/retirer" element={<Retirer />} />

import HistoriqueTransactions from './pages/HistoriqueTransactions';
import HistoriqueJeux from './pages/HistoriqueJeux';
<Route path="/historique-transactions" element={<HistoriqueTransactions />} />
<Route path="/historique-jeux" element={<HistoriqueJeux />} />

import Roulette from './pages/games/Roulette';
import Slots from './pages/games/Slots';
import Blackjack from './pages/games/Blackjack';
<Route path="/jeu/roulette" element={<Roulette />} />
<Route path="/jeu/slots" element={<Slots />} />
<Route path="/jeu/blackjack" element={<Blackjack />} />

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />