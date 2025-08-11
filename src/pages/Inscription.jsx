import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url/api/auth/register', { email, password, username });
      navigate('/connexion');
    } catch (err) {
      alert("Erreur d'inscription");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input type="text" placeholder="Pseudo" onChange={e => setUsername(e.target.value)} required /><br />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required /><br />
      <button type="submit">S'inscrire</button>
    </form>
  );
}