import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {
  const [solde, setSolde] = useState(null);

  useEffect(() => {
    const fetchSolde = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('https://your-backend-url/api/user', {
          headers: { 'x-auth-token': token }
        });
        setSolde(res.data.solde);
      } catch (err) {}
    };
    fetchSolde();
  }, []);

  return (
    <div style={{ background: '#eee', padding: 10 }}>
      <strong>Solde: {solde !== null ? solde + ' XOF' : '...'}</strong>
    </div>
  );
}