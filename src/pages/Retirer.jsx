import React, { useState } from 'react';
import axios from 'axios';

export default function Retirer() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleRetrait = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('https://your-backend-url/api/payment/retirer', { phone, amount }, {
        headers: { 'x-auth-token': token }
      });
      alert('Retrait en cours...');
    } catch (err) {
      alert('Erreur de retrait');
    }
  };

  return (
    <form onSubmit={handleRetrait}>
      <h2>Retirer via Airtel Money</h2>
      <input type="text" placeholder="Numéro Airtel" onChange={e => setPhone(e.target.value)} required /><br />
      <input type="number" placeholder="Montant" onChange={e => setAmount(e.target.value)} required /><br />
      <button type="submit">Retirer</button>
    </form>
  );
}