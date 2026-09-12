import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bharathiTimelineData } from '../data/bharathiTimeline';
import { useTimelineProgress } from '../hooks/useTimelineProgress';
import TimelineNode from '../components/Timeline/TimelineNode';
import TimelineProgress from '../components/Timeline/TimelineProgress';
import BharathiSimulation from '../components/Timeline/BharathiSimulation';
import './BharathiTimeline.css';

const BharathiTimeline = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const { progress, markYearCompleted, toast } = useTimelineProgress(bharathiTimelineData.length);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  const handleComplete = (year) => {
    markYearCompleted(year);
  };

  const handleExit = () => {
    setSelectedYear(null);
    window.scrollTo(0, 0);
  };

  const currentIndex = bharathiTimelineData.findIndex(d => d.year === selectedYear);
  const hasNext = currentIndex >= 0 && currentIndex < bharathiTimelineData.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setSelectedYear(bharathiTimelineData[currentIndex + 1].year);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedYear(bharathiTimelineData[currentIndex - 1].year);
    }
  };

  const selectedData = bharathiTimelineData.find(d => d.year === selectedYear);

  return (
    <div className="bt-container">
      {/* Toast Notification for Gamification */}
      {toast && <div className="bt-toast">{toast}</div>}

      {!selectedYear ? (
        <>
          {/* Hero Section */}
          <div className="bt-hero">
            <div className="bt-badge">BHARATHI TIMELINE • 1882–1921</div>
            <h1 className="bt-hero-title">STEP INTO BHARATHIYAR'S ERA</h1>
            <h2 className="bt-hero-subtitle">
              “Explore the journey of Mahakavi Bharathiyar through time, ideas, poetry and revolution.”
            </h2>
            <p className="bt-hero-desc">
              Choose a year and experience the story behind the poet who imagined a fearless, educated and equal India.
            </p>
            <div className="bt-hero-actions">
              <button className="bt-primary-btn" onClick={() => handleSelectYear(1882)}>
                START TIME TRAVEL →
              </button>
            </div>
          </div>

          {/* Interactive Timeline Scale */}
          <div className="bt-scale-container">
            <div className="bt-scale">
              {bharathiTimelineData.map((data, index) => (
                <TimelineNode 
                  key={data.year}
                  data={data}
                  isSelected={false}
                  isCompleted={progress.completedYears.includes(data.year)}
                  onClick={handleSelectYear}
                />
              ))}
            </div>
          </div>

          <TimelineProgress progress={progress.completedYears.length} total={bharathiTimelineData.length} />

          {/* End of Journey Experience */}
          {progress.journeyCompleted && (
            <div className="bt-end-journey">
              <h2>THE JOURNEY ENDS.<br/>THE VISION CONTINUES.</h2>
              <div className="bt-end-visual">
                <div className="particle-net"></div>
                <p>From poetry to progress.<br/>From vision to innovation.<br/>From Bharathi's era to our AI era.</p>
              </div>
              <div className="bt-end-formula">
                <span>BHARATHIYAR'S VISION</span> + <span>ARTIFICIAL INTELLIGENCE</span> = <span>A NEW GENERATION OF LEARNERS</span>
              </div>
              <div className="bt-end-actions">
                <button className="bt-primary-btn" onClick={() => navigate('/explore')}>
                  EXPLORE HIS VISION TODAY →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Cinematic Simulation Screen */
        <div className="bt-simulation-screen">
           <BharathiSimulation 
             data={selectedData}
             hasNext={hasNext}
             hasPrev={hasPrev}
             onNext={handleNext}
             onPrev={handlePrev}
             onExit={handleExit}
             onComplete={handleComplete}
           />
           <div className="bt-simulation-progress-wrapper">
             <TimelineProgress progress={progress.completedYears.length} total={bharathiTimelineData.length} />
           </div>
        </div>
      )}
    </div>
  );
};

export default BharathiTimeline;
