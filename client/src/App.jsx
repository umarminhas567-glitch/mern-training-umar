import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import ProductListPage from './pages/ProductListPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailPage from './pages/ProductDetailPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute><ProductListPage /></ProtectedRoute>} />
          <Route path="/products/create" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ProductCreatePage /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}