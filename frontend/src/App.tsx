// src/App.tsx
import React from 'react';
import type { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MedicineSearch from './components/MedicineSearch';
import Chatbot from './components/Chatbot';
import ColumnsOverview from './components/MainColumns';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>MediSearch AI</h1>
          <div className="nav-links">
            <Link to="/">Medicine Search</Link>
            <Link to="/medicine-info">Medicine Information</Link>
            <Link to="/chatbot">Health Chatbot</Link>
            <Link to="/ui">UI / User Interaction</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MedicineSearch />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/medicine-info" element={<ColumnsOverview section="medicineInfo" />} />
            <Route path="/ui" element={<ColumnsOverview section="ui" />} />
          </Routes>
        </main>

        <footer className="disclaimer">
          Educational project only. Not medical advice. Consult a doctor.
        </footer>
      </div>
    </Router>
  );
}

export default App;
