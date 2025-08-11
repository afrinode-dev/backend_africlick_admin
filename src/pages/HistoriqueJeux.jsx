import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoriqueJeux() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://your-backend-url/api/history/games', {
        headers: { 'x-auth-token': token }
      });
      setGames(res.data);
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Historique des Jeux</h2>
      <ul>
        {games.map((game, idx) => (
          <li key={idx}>
            {game.game} - Mise: {game.bet} - Gain: {game.win} - {new Date(game.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}