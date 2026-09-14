import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.in_stock ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/products/${product.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}