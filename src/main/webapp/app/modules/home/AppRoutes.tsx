import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'app/modules/home/home';
import Dashboard from 'app/modules/home/Dashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Add other routes here */}
    </Routes>
  </Router>
);

export default AppRoutes;
