import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Tracker from './components/Tracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
};

export default App;
