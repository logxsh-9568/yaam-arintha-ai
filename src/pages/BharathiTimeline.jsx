import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bharathiTimelineData } from '../data/bharathiTimeline';
import { useTimelineProgress } from '../hooks/useTimelineProgress';
import TimelineNode from '../components/Timeline/TimelineNode';
import TimelineProgress from '../components/Timeline/TimelineProgress';
import BharathiSimulation from '../components/Timeline/BharathiSimulation';
import LanguageToggle from '../components/Timeline/LanguageToggle';
import './BharathiTimeline.css';

const BharathiTimeline = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [fullHistoryMode, setFullHistoryMode] = useState(false);
  
  const { 
    progress, markYearCompleted, language, setLanguage, 
    autoVoice, setAutoVoice, toast 
  } = useTimelineProgress(bharathiTimelineData.length);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setFullHistoryMode(false);
  };

  const startFullHistory = () => {
    setSelectedYear(bharathiTimelineData[0].year);
    setFullHistoryMode(true);
  };

  const handleComplete = (year) => {
    markYearCompleted(year);
  };

  const handleExit = () => {
    setSelectedYear(null);
    setFullHistoryMode(false);
    window.scrollTo(0, 0);
  };

  const currentIndex = bharathiTimelineData.findIndex(d => d.year === selectedYear);
  const hasNext = currentIndex >= 0 && currentIndex < bharathiTimelineData.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setSelectedYear(bharathiTimelineData[currentIndex + 1].year);
    } else if (fullHistoryMode) {
      // Reached the end of full history mode
      handleExit();
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
      {/* Toast Notification */}
      {toast && <div className="bt-toast">{toast}</div>}

      <div className="bt-top-bar">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      {!selectedYear ? (
        <>
          {/* Cinematic Intro / Hero */}
          <div className="bt-hero">
            <div className="bt-badge">BHARATHI TIMELINE • 1882–1921</div>
            <h1 className="bt-hero-title">
              {language === 'ta' ? "பாரதியாரின் காலத்திற்குள் நுழையுங்கள்" : "STEP INTO BHARATHIYAR'S ERA"}
            </h1>
            <h2 className="bt-hero-subtitle">
              {language === 'ta' 
                ? "ஒரு கவிஞரின் வாழ்க்கையை மட்டும் அல்ல — ஒரு சிந்தனையின் பயணத்தை அனுபவியுங்கள்."
                : "Don't just learn the life of a poet — experience the journey of a revolutionary vision."}
            </h2>
            <div className="bt-hero-actions">
              <button className="bt-primary-btn" onClick={() => handleSelectYear(bharathiTimelineData[0].year)}>
                {language === 'ta' ? "பயணத்தை தொடங்கு →" : "START THE JOURNEY →"}
              </button>
              <button className="bt-secondary-btn" onClick={startFullHistory}>
                {language === 'ta' ? "முழு வரலாற்றைக் கேள்" : "LISTEN TO FULL HISTORY"}
              </button>
            </div>
          </div>

          {/* Interactive Timeline Scale */}
          <div className="bt-scale-container">
            <div className="bt-scale-vertical">
              {bharathiTimelineData.map((data) => (
                <TimelineNode 
                  key={data.year}
                  data={data}
                  language={language}
                  isSelected={false}
                  isCompleted={progress.completedYears.includes(data.year)}
                  onClick={handleSelectYear}
                />
              ))}
            </div>
          </div>

          <TimelineProgress 
            progress={progress.completedYears.length} 
            total={bharathiTimelineData.length} 
            language={language}
          />

          {/* End of Journey */}
          {progress.journeyCompleted && (
            <div className="bt-end-journey">
              <h2>{language === 'ta' ? "பயணம் முடிந்தது. பார்வை தொடர்கிறது." : "THE JOURNEY ENDS. THE VISION CONTINUES."}</h2>
              <p>{language === 'ta' ? "பாரதியாரின் பார்வை இன்று உங்கள் கையில்." : "Bharathiyar's vision is now in your hands."}</p>
              
              <div className="bt-end-actions">
                <button className="bt-primary-btn" onClick={() => handleSelectYear(bharathiTimelineData[0].year)}>
                  {language === 'ta' ? "மீண்டும் பயணம் செய்" : "RESTART JOURNEY"}
                </button>
                <button className="bt-secondary-btn" onClick={() => navigate('/classroom')}>
                  {language === 'ta' ? "AI வகுப்பறை" : "AI CLASSROOM"}
                </button>
                <button className="bt-secondary-btn" onClick={() => navigate('/explore')}>
                  {language === 'ta' ? "பார்வை இன்று (Vision Today)" : "VISION TODAY"}
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
             language={language}
             autoVoice={autoVoice}
             setAutoVoice={setAutoVoice}
             hasNext={hasNext}
             hasPrev={hasPrev}
             onNext={handleNext}
             onPrev={handlePrev}
             onExit={handleExit}
             onComplete={handleComplete}
             fullHistoryMode={fullHistoryMode}
           />
           <div className="bt-simulation-progress-wrapper">
             <TimelineProgress 
               progress={currentIndex + 1} 
               total={bharathiTimelineData.length} 
               language={language} 
             />
           </div>
        </div>
      )}
    </div>
  );
};

export default BharathiTimeline;
