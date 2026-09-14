import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.message || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px' }} 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value= {email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px' }} 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px' }} 
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}