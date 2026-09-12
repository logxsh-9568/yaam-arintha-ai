import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Pause, Play, Square, X } from 'lucide-react';
import '../../pages/BharathiTimeline.css';

const SimulationControls = ({ 
  onPrev, onNext, onReplay, onTogglePause, onStop, onPlay, onExit, 
  isPlaying, hasPrev, hasNext, language 
}) => {
  return (
    <div className="bt-controls">
      <button 
        className="bt-control-btn" 
        onClick={onPrev} 
        disabled={!hasPrev}
        aria-label="Previous Year"
      >
        <ArrowLeft size={18} /> <span className="hide-mobile">{language === 'ta' ? 'முந்தைய' : 'Prev'}</span>
      </button>
      
      <div className="bt-control-center">
        <button 
          className="bt-control-btn icon-only" 
          onClick={onPlay}
          title={language === 'ta' ? 'இயக்கு' : 'Play Voice'}
        >
          <Play size={18} />
        </button>
        <button 
          className="bt-control-btn icon-only" 
          onClick={onTogglePause}
          title={language === 'ta' ? 'இடைநிறுத்து' : 'Pause Voice'}
        >
          <Pause size={18} />
        </button>
        <button 
          className="bt-control-btn icon-only" 
          onClick={onStop}
          title={language === 'ta' ? 'நிறுத்து' : 'Stop Voice'}
        >
          <Square size={18} />
        </button>
        <button 
          className="bt-control-btn icon-only" 
          onClick={onReplay}
          title={language === 'ta' ? 'மீண்டும் தொடங்கு' : 'Replay Scene'}
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <button 
        className="bt-control-btn" 
        onClick={onNext} 
        disabled={!hasNext}
        aria-label="Next Year"
      >
        <span className="hide-mobile">{language === 'ta' ? 'அடுத்த' : 'Next'}</span> <ArrowRight size={18} />
      </button>

      <button 
        className="bt-control-btn danger" 
        onClick={onExit}
        aria-label="Exit Simulation"
      >
        <X size={18} /> <span className="hide-mobile">{language === 'ta' ? 'வெளியேறு' : 'Exit'}</span>
      </button>
    </div>
  );
};

export default SimulationControls;
