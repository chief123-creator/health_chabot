// src/components/MedicineSearch.tsx
import React, { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import type { Medicine, ApiResponse } from '../types';

const MedicineSearch: React.FC = () => {
  const [searchType, setSearchType] = useState<'text' | 'image'>('text');
  const [input, setInput] = useState<string | File>('');
  const [results, setResults] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setInput(acceptedFiles[0]);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1
  });

  const handleSearch = async (): Promise<void> => {
    if (!input) {
      setError('Please enter medicine name or upload image');
      return;
    }
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const formData = new FormData();
      if (searchType === 'image' && input instanceof File) {
        formData.append('image', input);
      } else {
        formData.append('name', input as string);
      }
      
      const res = await axios.post<ApiResponse>(
        'http://localhost:8000/api/search-medicine', 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setResults(res.data as Medicine);
      }
    } catch (err) {
      setError('Medicine not found or server error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      <h2>Search Medicines</h2>
      <p className="search-subtitle">
        Find medicines by name or by uploading a strip photo. View uses, dosage, and safety info.
      </p>
      
      <div className="search-controls">
        <select 
          value={searchType} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value as 'text' | 'image')}
          className="search-type"
        >
          <option value="text">Text Search</option>
          <option value="image">Image Upload (OCR)</option>
        </select>

        {searchType === 'text' ? (
          <input
            type="text"
            value={input as string}
            onChange={handleInputChange}
            placeholder="Enter medicine name (e.g., Paracetamol)"
            className="text-input"
            onKeyPress={handleKeyPress}
          />
        ) : (
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <p>Drag medicine strip image here or click to browse</p>
            {input instanceof File && <p className="file-name">{input.name}</p>}
          </div>
        )}

        <button 
          onClick={handleSearch} 
          disabled={loading || !input} 
          className="search-btn"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      
      {results && (
        <div className="medicine-card">
          <div className="medicine-card-header">
            <div>
              <h3>{results.name}</h3>
              {results.manufacturerName && (
                <p className="manufacturer">
                  Manufacturer: {results.manufacturerName}
                </p>
              )}
              <p className="meta-line">
                {results.type && <span className="pill">{results.type}</span>}
                {results.packSize && <span className="pill">{results.packSize}</span>}
                {typeof results.priceRupee === 'number' && (
                  <span className="pill">
                    ₹{results.priceRupee.toFixed(2)}
                  </span>
                )}
              </p>
            </div>

            {results.imageUrl && (
              <div className="medicine-image-wrapper">
                <img src={results.imageUrl} alt={results.name} />
              </div>
            )}
          </div>

          {results.composition && (
            <div className="info-row">
              <strong>Composition:</strong> {results.composition}
            </div>
          )}

          {results.uses && (
            <div className="info-row">
              <strong>Uses / indications:</strong> {results.uses}
            </div>
          )}

          <div className="info-grid">
            {results.sideEffects && (
              <div className="info-item">
                <strong>Side effects:</strong> {results.sideEffects}
              </div>
            )}

            {results.chemicalClass && (
              <div className="info-item">
                <strong>Chemical class:</strong> {results.chemicalClass}
              </div>
            )}

            {results.therapeuticClass && (
              <div className="info-item">
                <strong>Therapeutic class:</strong> {results.therapeuticClass}
              </div>
            )}

            {results.substitutes && results.substitutes.length > 0 && (
              <div className="info-item">
                <strong>Substitutes:</strong>
                <ul className="substitute-list">
                  {results.substitutes.map((sub, idx) => (
                    <li key={idx}>{sub}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Search Features Section */}
      <div className="search-features">
        <h3>Medicine Search – Features</h3>
        <ul>
          <li>Search by text (medicine name)</li>
          <li>Search by image (photo upload)</li>
          <li>OCR-extracted medicine name</li>
          <li>Auto-suggest / spelling correction</li>
          <li>Search history (optional)</li>
        </ul>
      </div>
    </div>
  );
};

export default MedicineSearch;