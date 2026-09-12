import React from 'react';
import '../../pages/BharathiTimeline.css';

const TimelineNode = ({ data, language, isSelected, isCompleted, onClick }) => {
  const title = language === 'ta' ? data.titleTamil : data.titleEnglish;
  return (
    <div 
      className={`bt-node ${isSelected ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={() => onClick(data.year)}
    >
      <div className="bt-node-year">{data.year}</div>
      <div className="bt-node-dot"></div>
      <div className="bt-node-title">{title}</div>
    </div>
  );
};

export default TimelineNode;
