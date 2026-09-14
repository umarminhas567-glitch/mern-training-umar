import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCreatePage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          category,
          in_stock: inStock ? 1 : 0
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.message || 'Product creation failed');
      }

      navigate('/');
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Create Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} /> In Stock
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}