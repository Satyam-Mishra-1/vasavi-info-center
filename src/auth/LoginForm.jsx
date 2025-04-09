// src/components/LoginForm.jsx
import React, { useState } from 'react';
import API from '../api';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ phone: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await API.post('/auth/login', credentials);
    localStorage.setItem('token', res.data.token);
    onLogin(res.data.user);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 shadow-xl bg-white rounded-xl">
      <h2 className="text-xl font-bold">Login</h2>
      <input name="phone" placeholder="Phone" onChange={handleChange} required className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
      <button type="submit" className="btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;
