import React, { useState } from 'react';
import axios from 'axios';

export default function Recharge() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecharge = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('https://your-backend-url/api/payment/recharge', { phone, amount }, {
        headers: { 'x-auth-token': token }
      });
      alert('Recharge envoyée. Vérifie ton téléphone.');
    } catch (err) {
      alert('Erreur de recharge');
    }
  };

  return (
    <form onSubmit={handleRecharge}>
      <h2>Recharger via Airtel Money</h2>
      <input type="text" placeholder="Numéro Airtel" onChange={e => setPhone(e.target.value)} required /><br />
      <input type="number" placeholder="Montant" onChange={e => setAmount(e.target.value)} required /><br />
      <button type="submit">Recharger</button>
    </form>
  );
}