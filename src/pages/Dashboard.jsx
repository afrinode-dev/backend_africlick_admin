import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://your-backend-url/api/user/me', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Bienvenue {user.username}</h2>
      <p>Solde : {user.solde} crédits</p>
      <button onClick={() => alert('Recharge via Airtel bientôt')}>Recharger</button>
      <button onClick={() => alert('Retrait bientôt disponible')}>Retirer</button>
    </div>
  );
}