import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const { role, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">Home</Link>
      
      {(role === 'manager' || role === 'admin') && (
        <Link to="/products/create"> Create Product</Link>
      )}

      {token ? (
        <button onClick={() => dispatch(logout())}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
          <Link to="/signup" style={{ marginLeft: '10px' }}>Sign Up</Link>
        </>
      )}
    </nav>
  );
}