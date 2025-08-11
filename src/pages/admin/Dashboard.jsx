import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [retraits, setRetraits] = useState([]);
  const [games, setGames] = useState([]);
  const [txns, setTxns] = useState([]);

  const token = localStorage.getItem('adminToken');
  const headers = { 'x-admin-token': token };

  const fetchAll = async () => {
    const u = await axios.get('https://your-backend-url/api/admin/users', { headers });
    const r = await axios.get('https://your-backend-url/api/admin/retraits', { headers });
    const g = await axios.get('https://your-backend-url/api/admin/games', { headers });
    const t = await axios.get('https://your-backend-url/api/admin/transactions', { headers });
    setUsers(u.data);
    setRetraits(r.data);
    setGames(g.data);
    setTxns(t.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const traiterRetrait = async (id, action) => {
    await axios.post(`https://your-backend-url/api/admin/retraits/${id}/${action}`, {}, { headers });
    fetchAll();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Utilisateurs</h3>
      <ul>{users.map(u => <li key={u._id}>{u.nom} - {u.email} - {u.solde} XOF</li>)}</ul>

      <h3>Jeux joués</h3>
      <ul>{games.map(g => <li key={g._id}>{g.game} - Mise: {g.bet} - Gain: {g.win}</li>)}</ul>

      <h3>Transactions</h3>
      <ul>{txns.map(t => <li key={t._id}>{t.type} - {t.montant} XOF</li>)}</ul>

      <h3>Retraits</h3>
      <ul>
        {retraits.map(r => (
          <li key={r._id}>
            {r.nom} - {r.montant} XOF - {r.numero} - {r.statut}
            {r.statut === 'en attente' && (
              <>
                <button onClick={() => traiterRetrait(r._id, 'valider')}>Valider</button>
                <button onClick={() => traiterRetrait(r._id, 'rejeter')}>Rejeter</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}