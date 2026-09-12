import React from 'react';
import '../../pages/BharathiTimeline.css';

const TimelineNode = ({ data, isSelected, isCompleted, onClick }) => {
  return (
    <div 
      className={`bt-node ${isSelected ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={() => onClick(data.year)}
    >
      <div className="bt-node-year">{data.year}</div>
      <div className="bt-node-dot"></div>
      <div className="bt-node-title">{data.event}</div>
    </div>
  );
};

export default TimelineNode;
