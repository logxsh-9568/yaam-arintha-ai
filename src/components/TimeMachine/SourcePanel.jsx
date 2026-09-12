import React from 'react';
import { X } from 'lucide-react';

const SourcePanel = ({ sources, onClose }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="source-modal-overlay">
      <div className="source-modal">
        <button className="close-modal" onClick={onClose} aria-label="Close sources">
          <X size={24} />
        </button>
        <h3>Historical Sources</h3>
        <ul className="source-list">
          {sources.map((source, index) => (
            <li key={index}>
              <h4>{source.title}</h4>
              <p>{source.author}{source.year ? `, ${source.year}` : ''}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SourcePanel;
