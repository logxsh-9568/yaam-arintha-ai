import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Pause, Play, X } from 'lucide-react';
import '../../pages/BharathiTimeline.css';

const SimulationControls = ({ 
  onPrev, onNext, onReplay, onTogglePause, onExit, 
  isPlaying, hasPrev, hasNext 
}) => {
  return (
    <div className="bt-controls">
      <button 
        className="bt-control-btn" 
        onClick={onPrev} 
        disabled={!hasPrev}
        aria-label="Previous Year"
      >
        <ArrowLeft size={18} /> <span className="hide-mobile">Previous</span>
      </button>
      
      <div className="bt-control-center">
        <button 
          className="bt-control-btn icon-only" 
          onClick={onReplay}
          aria-label="Replay Simulation"
        >
          <RotateCcw size={18} />
        </button>
        <button 
          className="bt-control-btn icon-only" 
          onClick={onTogglePause}
          aria-label={isPlaying ? "Pause Simulation" : "Resume Simulation"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      <button 
        className="bt-control-btn" 
        onClick={onNext} 
        disabled={!hasNext}
        aria-label="Next Year"
      >
        <span className="hide-mobile">Next</span> <ArrowRight size={18} />
      </button>

      <button 
        className="bt-control-btn danger" 
        onClick={onExit}
        aria-label="Exit Simulation"
      >
        <X size={18} /> <span className="hide-mobile">Exit</span>
      </button>
    </div>
  );
};

export default SimulationControls;
