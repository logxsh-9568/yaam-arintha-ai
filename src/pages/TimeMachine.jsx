import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeMachineHero from '../components/TimeMachine/TimeMachineHero';
import BharathiTimeline from '../components/TimeMachine/BharathiTimeline';
import YearScene from '../components/TimeMachine/YearScene';
import SourcePanel from '../components/TimeMachine/SourcePanel';
import JourneyProgress from '../components/TimeMachine/JourneyProgress';
import { bharathiTimeline } from '../data/bharathiTimeline';
import './TimeMachine.css';

const TimeMachine = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [exploredYears, setExploredYears] = useState(new Set());
  const [showSources, setShowSources] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setExploredYears(prev => new Set([...prev, year]));
    // Scroll to scene after a brief delay for transition
    setTimeout(() => {
      document.getElementById('scene-view')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getYearData = (year) => bharathiTimeline.find(data => data.year === year);
  
  const currentIndex = bharathiTimeline.findIndex(data => data.year === selectedYear);
  const hasNext = currentIndex >= 0 && currentIndex < bharathiTimeline.length - 1;
  const hasPrev = currentIndex > 0;
  
  const isCompleted = exploredYears.size === bharathiTimeline.length;

  const handleNext = () => {
    if (hasNext) {
      handleSelectYear(bharathiTimeline[currentIndex + 1].year);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      handleSelectYear(bharathiTimeline[currentIndex - 1].year);
    }
  };

  return (
    <div className="time-machine-container">
      <JourneyProgress 
        total={bharathiTimeline.length} 
        explored={exploredYears.size} 
      />

      <TimeMachineHero />
      
      <div className="tm-content">
        <BharathiTimeline 
          timelineData={bharathiTimeline}
          selectedYear={selectedYear}
          onSelectYear={handleSelectYear}
        />

        {selectedYear ? (
          <div id="scene-view">
            <YearScene 
              yearData={getYearData(selectedYear)}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
              onOpenSources={() => setShowSources(true)}
            />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
             <p style={{ color: 'rgba(232, 220, 196, 0.5)', fontStyle: 'italic', fontSize: '1.2rem' }}>
               Select a year above to begin the journey.
             </p>
          </div>
        )}

        {isCompleted && (
          <div className="end-screen">
            <h2>YOU HAVE COMPLETED BHARATHI'S JOURNEY</h2>
            <p>1882 → 1921<br />39 years of history</p>
            <h3>WHAT REMAINS?</h3>
            <p>His words, ideas, poetry, vision, and influence.</p>
            <div className="end-screen-actions">
              <button className="nav-btn" onClick={() => navigate('/explore')}>
                EXPLORE HIS WORKS
              </button>
            </div>
          </div>
        )}
      </div>

      {showSources && selectedYear && (
        <SourcePanel 
          sources={getYearData(selectedYear).sources} 
          onClose={() => setShowSources(false)} 
        />
      )}
    </div>
  );
};

export default TimeMachine;
