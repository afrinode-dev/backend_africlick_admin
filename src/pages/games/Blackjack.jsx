import React, { useState } from 'react';
import axios from 'axios';

export default function Blackjack() {
  const [bet, setBet] = useState('');
  const [result, setResult] = useState(null);

  const jouer = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('https://your-backend-url/api/games/play', {
        game: 'blackjack',
        bet: parseFloat(bet)
      }, {
        headers: { 'x-auth-token': token }
      });
      setResult(res.data);
    } catch (err) {
      alert('Erreur : ' + err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Blackjack</h2>
      <input type="number" placeholder="Montant de la mise" onChange={e => setBet(e.target.value)} />
      <button onClick={jouer}>Jouer</button>
      {result && (
        <div>
          <p>Résultat : {result.win > 0 ? 'Gagné ' + result.win + ' XOF' : 'Perdu'}</p>
          <p>Solde actuel : {result.solde} XOF</p>
        </div>
      )}
    </div>
  );
}