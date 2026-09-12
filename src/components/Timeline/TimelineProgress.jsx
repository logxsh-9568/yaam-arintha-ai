import React from 'react';
import '../../pages/BharathiTimeline.css';

const TimelineProgress = ({ progress, total, language }) => {
  const percentage = (progress / total) * 100;
  
  return (
    <div className="bt-progress-container">
      <div className="bt-progress-text">
        {language === 'ta' ? 'பயண நிலை:' : 'TIMELINE PROGRESS:'} {progress} / {total}
      </div>
      <div className="bt-progress-bar-bg">
        <div 
          className="bt-progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimelineProgress;
