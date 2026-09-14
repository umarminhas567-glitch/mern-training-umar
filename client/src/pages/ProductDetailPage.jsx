import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load product');
        return res.json();
      })
      .then(data => {
        const found = data.find(p => String(p.id) === String(id));
        if (found) setProduct(found);
        else setError('Product not found');
      })
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        return setError(data.message || 'Delete failed');
      }

      navigate('/');
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Product Details</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>In Stock:</strong> {product.in_stock ? 'Yes' : 'No'}</p>

      {role === 'admin' && (
        <button onClick={handleDelete} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer' }}>
          Delete Product
        </button>
      )}
    </div>
  );
}