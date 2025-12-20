// src/components/MainColumns.tsx
import React from 'react';
import {
  medicineSearchFeatures,
  medicineInfoFeatures,
  chatbotFeatures,
  uiFeatures
} from '../config/columns'; // Ensure this file exists or adjust the path
import './MainColumns.css';

type SectionKey = 'medicineSearch' | 'medicineInfo' | 'chatbot' | 'ui';

interface Props {
  section: SectionKey;
}

const MainColumns: React.FC<Props> = ({ section }) => {
  let title = '';
  let subtitle = '';
  let items: string[] = [];

  if (section === 'medicineInfo') {
    title = 'Medicine Information – Data Columns';
    subtitle = 'Core medicine details shown after a successful search.';
    items = medicineInfoFeatures;
  } else if (section === 'ui') {
    title = 'UI / User Interaction – Columns';
    subtitle = 'System behaviours that improve usability and safety.';
    items = uiFeatures;
  } else if (section === 'medicineSearch') {
    title = 'Medicine Search – Columns';
    subtitle = 'Features used to search and refine medicine results.';
    items = medicineSearchFeatures;
  } else if (section === 'chatbot') {
    title = 'Health Chatbot – Columns';
    subtitle = 'Information handled in each chatbot answer.';
    items = chatbotFeatures;
  }

  return (
    <div className="columns-page">
      <h2>{title}</h2>
      <p className="columns-subtitle">{subtitle}</p>

      <div className="columns-grid">
        {items.map((item, idx) => (
          <div key={idx} className="columns-card">
            <span className="index">{idx + 1}</span>
            <span className="label">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainColumns;
