import React, { useState, useEffect } from 'react';
import BharathiAvatar from './BharathiAvatar';
import SimulationControls from './SimulationControls';
import VisionBridge from './VisionBridge';
import TimeTravelTransition from './TimeTravelTransition';
import '../../pages/BharathiTimeline.css';

const BharathiSimulation = ({ data, hasNext, hasPrev, onNext, onPrev, onExit, onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Arrival, 1: Moment, 2: Vision, 3: Today
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // For forcing re-renders on replay

  // Handle stage transitions
  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (stage === 0) {
        timer = setTimeout(() => setStage(1), 2000);
      } else if (stage === 1) {
        timer = setTimeout(() => setStage(2), 8000); // Extended for narration
      } else if (stage === 2) {
        timer = setTimeout(() => setStage(3), 5000);
      } else if (stage === 3) {
        // Mark year as completed after full simulation
        onComplete(data.year);
      }
    }
    return () => clearTimeout(timer);
  }, [stage, isPlaying, data.year, onComplete]);

  // TTS Narration Effect
  useEffect(() => {
    if (stage === 1 && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.narration);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stage, data.narration, data.year]);

  // Handle Pause/Resume for TTS
  useEffect(() => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    }
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'Escape') onExit();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, onPrev, onNext, onExit]);

  const handleReplay = () => {
    setStage(0);
    setKey(k => k + 1);
    setIsPlaying(true);
  };

  const animationState = isPlaying ? 'running' : 'paused';

  return (
    <div className="bt-simulation-wrapper" key={`${data.year}-${key}`}>
      {/* Stage 0: Time Arrival */}
      {stage === 0 && (
        <TimeTravelTransition year={data.year} title={data.title} />
      )}

      {/* Stage 1, 2, 3: Main Scene */}
      {stage > 0 && (
        <div className={`bt-scene bt-theme-${data.visualStyle}`} style={{ animationPlayState: animationState }}>
          <div className="bt-scene-background" style={{ animationPlayState: animationState }}>
            <div className="bt-particles" style={{ animationPlayState: animationState }}></div>
          </div>
          
          <div className="bt-scene-content">
            {/* Header info */}
            <div className="bt-scene-header">
              <div className="bt-scene-year">{data.year}</div>
              <div className="bt-scene-location">{data.location}</div>
              <h2 className="bt-scene-title">"{data.title}"</h2>
            </div>

            <div className="bt-scene-layout">
              {/* Left Column: Avatar & Event info */}
              <div className="bt-scene-left">
                <BharathiAvatar styleClass={`avatar-${data.visualStyle}`} />
                <div className="bt-event-text">
                  <h3>{data.event}</h3>
                  <p>{data.description}</p>
                </div>
              </div>

              {/* Right Column: Dynamic Content based on stage */}
              <div className="bt-scene-right">
                
                {/* Stage 1: Narration */}
                {stage === 1 && (
                  <div className="bt-narration-panel fade-in">
                    <div className="panel-label">BHARATHI'S VOICE</div>
                    <p className="narration-text">"{data.narration}"</p>
                  </div>
                )}

                {/* Stage 2: The Vision (Keywords) */}
                {stage === 2 && (
                  <div className="bt-vision-keywords fade-in">
                    <div className="panel-label">THE VISION</div>
                    <div className="keyword-container">
                      {data.keywords.map((kw, i) => (
                        <div key={kw} className="keyword-badge" style={{ animationDelay: `${i * 0.5}s` }}>
                          {kw}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 3: Today (AI Interpretation & Bridge) */}
                {stage === 3 && (
                  <div className="bt-today-panel fade-in">
                    <div className="ai-interpretation">
                      <div className="panel-label ai-label">AI INTERPRETATION</div>
                      <div className="ai-cards">
                        <div className="ai-card">
                          <span>THEN</span>
                          <p>{data.aiInterpretation.then}</p>
                        </div>
                        <div className="ai-card">
                          <span>NOW</span>
                          <p>{data.aiInterpretation.now}</p>
                        </div>
                        <div className="ai-card">
                          <span>NEXT</span>
                          <p>{data.aiInterpretation.next}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vision Bridge visible mostly in Stage 3 or scrollable */}
          {stage === 3 && (
            <div className="bt-bridge-wrapper fade-in-up">
               <VisionBridge connection={data.modernConnection} />
            </div>
          )}
        </div>
      )}

      {/* Controls remain fixed at bottom */}
      <SimulationControls 
        onPrev={onPrev}
        onNext={onNext}
        onReplay={handleReplay}
        onTogglePause={() => setIsPlaying(!isPlaying)}
        onExit={onExit}
        isPlaying={isPlaying}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
};

export default BharathiSimulation;
