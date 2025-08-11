import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-backend-url/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required /><br />
      <button type="submit">Se connecter</button>
    </form>
  );
}