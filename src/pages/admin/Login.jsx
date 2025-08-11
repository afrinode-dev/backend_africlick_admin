import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('https://your-backend-url/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Échec de connexion');
    }
  };

  return (
    <div>
      <h2>Connexion Admin</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Se connecter</button>
    </div>
  );
}