import React, { useState } from 'react';
import '../styles/Filter.css';

function Filter({ onClose, onApply }) {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleApply = () => {
    onApply({ category, status });
    onClose();
  };

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={e => e.stopPropagation()}>
        <h2>Filter Stories</h2>
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Fiksi">Fiction</option>
            <option value="Non-Fiksi">Non-Fiction</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Draft">Draft</option>
            <option value="Publish">Published</option>
          </select>
        </div>
        <div className="filter-buttons">
          <button type="button" onClick={handleApply}>Apply</button>
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
