import React, { useState, useEffect, useRef } from 'react';
import BharathiAvatar from './BharathiAvatar';
import SimulationControls from './SimulationControls';
import VisionBridge from './VisionBridge';
import TimeTravelTransition from './TimeTravelTransition';
import { speakBharathi, stopBharathiVoice, pauseBharathiVoice, resumeBharathiVoice, isVoiceAvailable } from '../../utils/bharathiVoice';
import '../../pages/BharathiTimeline.css';

const BharathiSimulation = ({ 
  data, language, autoVoice, setAutoVoice,
  hasNext, hasPrev, onNext, onPrev, onExit, onComplete, fullHistoryMode 
}) => {
  const [stage, setStage] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); 
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  
  const title = language === 'ta' ? data.titleTamil : data.titleEnglish;
  const historical = language === 'ta' ? data.historicalTamil : data.historicalEnglish;
  const journey = language === 'ta' ? data.journeyTamil : data.journeyEnglish;
  const vision = language === 'ta' ? data.visionTamil : data.visionEnglish;
  const today = language === 'ta' ? data.todayTamil : data.todayEnglish;
  const narration = language === 'ta' ? data.narrationTamil : data.narrationEnglish;

  // Create a continuous story text for the AI voice
  const storyTextTamil = `${title}. ${historical} ${journey} ${narration}`;
  const storyTextEnglish = `${title}. ${historical} ${journey} ${narration}`;
  const textToSpeak = language === 'ta' ? storyTextTamil : storyTextEnglish;

  // Cleanup voice on unmount or language change
  useEffect(() => {
    return () => stopBharathiVoice();
  }, [language, data.year]);

  // Handle stage transitions and voice
  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (stage === 0) {
        timer = setTimeout(() => setStage(1), 3500); // Wait for transition
      } else if (stage === 1) {
        if (autoVoice && isVoiceAvailable()) {
          setVoiceActive(true);
          const didSpeak = speakBharathi(textToSpeak, language, 
            () => setVoiceActive(true),
            () => {
              setVoiceActive(false);
              // In full history mode, auto-next to continue the story
              if (fullHistoryMode) {
                setTimeout(() => onNext(), 2000);
              }
            }
          );
          if (!didSpeak) setVoiceError(true);
        } else if (!isVoiceAvailable()) {
          setVoiceError(true);
        }
        
        timer = setTimeout(() => onComplete(data.year), 2000);
      }
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, isPlaying, data.year, language, autoVoice, fullHistoryMode]); // Removed unstable function dependencies like onNext, onComplete


  // Handle manual Play/Pause/Stop
  useEffect(() => {
    if (isPlaying && voiceActive) {
      resumeBharathiVoice();
    } else if (!isPlaying && voiceActive) {
      pauseBharathiVoice();
    }
  }, [isPlaying, voiceActive]);

  const handleReplay = () => {
    stopBharathiVoice();
    setStage(0);
    setKey(k => k + 1);
    setIsPlaying(true);
  };

  const handleStop = () => {
    stopBharathiVoice();
    setIsPlaying(false);
    setVoiceActive(false);
  };

  const handlePlayVoice = () => {
    stopBharathiVoice();
    setIsPlaying(true);
    setVoiceActive(true);
    speakBharathi(textToSpeak, language, 
      () => setVoiceActive(true),
      () => setVoiceActive(false)
    );
  };

  const animationState = isPlaying ? 'running' : 'paused';

  return (
    <div className="bt-simulation-wrapper" key={`${data.year}-${language}-${key}`}>
      
      {stage === 0 && (
        <TimeTravelTransition year={data.year} title={title} language={language} />
      )}

      {stage > 0 && (
        <div className={`bt-scene bt-theme-${data.visualTheme}`} style={{ animationPlayState: animationState }}>
          <div className="bt-scene-background" style={{ animationPlayState: animationState }}>
            <div className="bt-particles" style={{ animationPlayState: animationState }}></div>
          </div>
          
          <div className="bt-scene-content">
            <div className="bt-scene-header">
              <div className="bt-scene-year">{data.year}</div>
              <div className="bt-scene-location">📍 {data.location}</div>
              <h2 className="bt-scene-title">"{title}"</h2>
            </div>

            <div className="bt-scene-layout">
              {/* Left Column */}
              <div className="bt-scene-left">
                <BharathiAvatar state={voiceActive ? 'speaking' : data.avatarState} language={language} />
                
                <div className="bt-voice-status">
                  {voiceActive && <span className="voice-indicator">● {language === 'ta' ? "AI குரல் ஒலிக்கிறது" : "AI VOICE ACTIVE"}</span>}
                  {voiceError && <span className="voice-error">{language === 'ta' ? "குரல் வசதி இந்த உலாவியில் கிடைக்கவில்லை." : "Voice playback is not available in this browser."}</span>}
                </div>

                <div className="bt-narration-panel fade-in">
                  <div className="panel-label">
                    {language === 'ta' ? "AI உருவாக்கிய வரலாற்று விளக்கம்" : "AI-INTERPRETED HISTORICAL NARRATION"}
                  </div>
                  <p className="narration-text">"{narration}"</p>
                </div>
              </div>

              {/* Right Column: 4 Layers */}
              <div className="bt-scene-right">
                
                <div className="info-layer fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="layer-header">{language === 'ta' ? 'அன்று (THEN)' : 'THEN'}</div>
                  <p>{historical}</p>
                </div>

                <div className="info-layer fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="layer-header">{language === 'ta' ? "பாரதியின் பயணம்" : "BHARATHI'S JOURNEY"}</div>
                  <p>{journey}</p>
                </div>

                <div className="info-layer fade-in" style={{ animationDelay: '0.6s' }}>
                  <div className="layer-header">{language === 'ta' ? "சிந்தனை (VISION)" : "VISION"}</div>
                  <p>{vision}</p>
                </div>

                <div className="info-layer highlight fade-in" style={{ animationDelay: '0.8s' }}>
                  <div className="layer-header">{language === 'ta' ? "இன்று (TODAY)" : "TODAY"}</div>
                  <p>{today}</p>
                </div>

              </div>
            </div>
          </div>

          <div className="bt-bridge-wrapper fade-in-up">
            <VisionBridge 
              connection={language === 'ta' ? data.modernConnectionTamil : data.modernConnectionEnglish} 
              language={language}
            />
          </div>
        </div>
      )}

      {/* Voice and Nav Controls */}
      <div className="bt-controls-wrapper">
        <SimulationControls 
          onPrev={onPrev}
          onNext={onNext}
          onReplay={handleReplay}
          onTogglePause={() => setIsPlaying(!isPlaying)}
          onStop={handleStop}
          onPlay={handlePlayVoice}
          onExit={onExit}
          isPlaying={isPlaying}
          hasPrev={hasPrev}
          hasNext={hasNext}
          language={language}
        />
      </div>
    </div>
  );
};

export default BharathiSimulation;
