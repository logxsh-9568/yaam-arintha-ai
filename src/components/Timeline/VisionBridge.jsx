import React from 'react';
import { ArrowRight, BookOpen, MessageSquare, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/BharathiTimeline.css';

const VisionBridge = ({ connection }) => {
  const navigate = useNavigate();

  return (
    <div className="bt-vision-bridge">
      <h3 className="bridge-title">FROM VISION TO ACTION</h3>
      
      <div className="bridge-cards">
        <div className="bridge-card">
          <div className="card-header">VISION</div>
          <p>{connection.vision}</p>
        </div>
        
        <div className="bridge-arrow"><ArrowRight className="bridge-icon"/></div>
        
        <div className="bridge-card">
          <div className="card-header">TODAY'S CHALLENGE</div>
          <p>{connection.challenge}</p>
        </div>
        
        <div className="bridge-arrow"><ArrowRight className="bridge-icon"/></div>
        
        <div className="bridge-card highlight">
          <div className="card-header">AI POSSIBILITY</div>
          <p>{connection.aiAction}</p>
        </div>
      </div>

      <div className="bridge-actions">
        <button className="bt-action-btn" onClick={() => navigate('/classroom')}>
          <BookOpen size={16} /> Continue Learning
        </button>
        <button className="bt-action-btn" onClick={() => navigate('/debate')}>
          <MessageSquare size={16} /> Challenge Ideas
        </button>
        <button className="bt-action-btn primary" onClick={() => navigate('/explore')}>
          <Zap size={16} /> Apply the Vision
        </button>
      </div>
    </div>
  );
};

export default VisionBridge;
