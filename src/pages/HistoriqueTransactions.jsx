import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoriqueTransactions() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://your-backend-url/api/history/transactions', {
        headers: { 'x-auth-token': token }
      });
      setTxns(res.data);
    };
    fetchTxns();
  }, []);

  return (
    <div>
      <h2>Historique des Transactions</h2>
      <ul>
        {txns.map((txn, idx) => (
          <li key={idx}>
            {txn.type} - {txn.amount} XOF - {txn.phone} - {new Date(txn.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}