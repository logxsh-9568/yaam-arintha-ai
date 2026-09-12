import React from 'react';

const JourneyProgress = ({ total, explored }) => {
  return (
    <div className="journey-progress">
      <span className="progress-label">YOUR JOURNEY</span>
      <span className="progress-value">{explored} / {total} CHAPTERS EXPLORED</span>
    </div>
  );
};

export default JourneyProgress;
