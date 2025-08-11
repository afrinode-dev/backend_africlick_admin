import React from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenue sur Africlick Casino</h1>
      <p><Link to="/connexion">Connexion</Link> | <Link to="/inscription">Inscription</Link></p>
    </div>
  );
}