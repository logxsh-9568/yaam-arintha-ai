import React from 'react';
import '../../pages/BharathiTimeline.css';

const TimeTravelTransition = ({ year, title }) => {
  return (
    <div className="bt-time-travel">
      <div className="bt-particles"></div>
      <h2 className="bt-entering">ENTERING</h2>
      <h1 className="bt-travel-year">{year}</h1>
      <h3 className="bt-travel-title">{title}</h3>
    </div>
  );
};

export default TimeTravelTransition;
