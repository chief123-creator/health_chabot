// src/components/ColumnsOverview.tsx
import React from 'react';
import {
  medicineSearchColumns,
  medicineInfoColumns,
  chatbotColumns,
  uiSystemColumns
} from '../config/columns';
import './ColumnsOverview.css';

const ColumnsOverview: React.FC = () => {
  const renderSection = (title: string, items: string[]) => (
    <section className="columns-section">
      <header className="columns-header">
        <h3>{title}</h3>
        <span className="pill">{items.length} fields</span>
      </header>
      <div className="columns-grid">
        {items.map((item, idx) => (
          <div key={idx} className="columns-card">
            <span className="index">{idx + 1}</span>
            <span className="label">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="columns-page">
      <h2>System Columns Overview</h2>
      <p className="columns-subtitle">
        This page lists all data fields and UI behaviours used across the MediSearch AI web app.
      </p>

      {renderSection('Medicine Search Module', medicineSearchColumns)}
      {renderSection('Medicine Information Module', medicineInfoColumns)}
      {renderSection('Health Chatbot Module', chatbotColumns)}
      {renderSection('UI / UX & System', uiSystemColumns)}
    </div>
  );
};

export default ColumnsOverview;
