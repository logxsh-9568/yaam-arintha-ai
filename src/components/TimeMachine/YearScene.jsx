import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Bot } from 'lucide-react';

const YearScene = ({ yearData, onNext, onPrev, hasNext, hasPrev, onOpenSources }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // Used to force re-render/replay animation

  // Reset state when year changes
  useEffect(() => {
    setIsPlaying(true);
    setKey(prev => prev + 1);
  }, [yearData.year]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setKey(prev => prev + 1);
      setIsPlaying(true);
    }, 50);
  };

  const getSimElementText = () => {
    switch (yearData.visualType) {
      case 'birth': return '1882';
      case 'poet': return 'BHARATHI';
      case 'exile': return 'PONDICHERRY';
      case 'revolution': return 'சுதந்திரம்';
      case 'literature': return 'பாஞ்சாலி சபதம்';
      case 'legacy': return 'VISIONARY';
      default: return yearData.location;
    }
  };

  return (
    <div className="tm-scene-container" key={key}>
      <div className="scene-header">
        <div className="scene-year">{yearData.year}</div>
        <h2 className="scene-title">"{yearData.title}"</h2>
      </div>

      <div className="simulation-window">
        <div className={`simulation-content sim-${yearData.visualType}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
          {/* Animated background element based on visualType */}
          <div className="sim-element" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
             {getSimElementText()}
          </div>
          <div className="simulation-overlay"></div>
          <div className="sim-disclaimer">
            AI-assisted historical reconstruction — visual interpretation, not original footage.
          </div>
        </div>
        
        <div className="scene-controls">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="control-btn" onClick={togglePlay}>
              {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>}
            </button>
            <button className="control-btn" onClick={handleReplay}>
              <RotateCcw size={16} /> Replay
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="control-btn" onClick={onOpenSources}>
               <BookOpen size={16} /> Historical Sources
             </button>
             <button className="control-btn" onClick={() => alert("AI feature coming soon. Backend integration required.")}>
               <Bot size={16} /> Ask Bharathi
             </button>
          </div>
        </div>
      </div>

      <div className="sim-text-content" style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <h3>Why this year mattered</h3>
        <p>{yearData.description}</p>
      </div>

      <div className="scene-actions">
        {hasPrev ? (
          <button className="nav-btn" onClick={onPrev}>
            ← Previous Year
          </button>
        ) : <div />}
        
        {hasNext ? (
          <button className="nav-btn" onClick={onNext}>
            TRAVEL TO NEXT YEAR →
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

export default YearScene;
