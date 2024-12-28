// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Billing from './pages/Billing';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;