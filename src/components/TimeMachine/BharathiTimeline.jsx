import React, { useEffect, useRef } from 'react';

const BharathiTimeline = ({ timelineData, selectedYear, onSelectYear }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to selected year on desktop
  useEffect(() => {
    if (scrollRef.current && selectedYear) {
      const selectedNode = scrollRef.current.querySelector('.timeline-node.active');
      if (selectedNode) {
        selectedNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedYear]);

  return (
    <div className="tm-timeline-wrapper" ref={scrollRef}>
      <div className="tm-timeline">
        {timelineData.map((data) => {
          const isActive = selectedYear === data.year;
          return (
            <div 
              key={data.year}
              className={`timeline-node ${isActive ? 'active' : ''}`}
              onClick={() => onSelectYear(data.year)}
            >
              <div className="timeline-year">{data.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-label">{data.event}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BharathiTimeline;
