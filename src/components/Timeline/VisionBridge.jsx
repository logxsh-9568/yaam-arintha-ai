import React from 'react';
import { ArrowRight, BookOpen, MessageSquare, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/BharathiTimeline.css';

const VisionBridge = ({ connection, language }) => {
  const navigate = useNavigate();

  return (
    <div className="bt-vision-bridge">
      <h3 className="bridge-title">
        {language === 'ta' ? 'அன்றைய சிந்தனை → இன்றைய உலகம்' : 'FROM VISION TO TODAY'}
      </h3>
      
      <div className="bridge-cards">
        <div className="bridge-card">
          <div className="card-header">{language === 'ta' ? 'அன்றைய சிந்தனை (VISION)' : 'VISION'}</div>
          <p>{connection?.vision}</p>
        </div>
        
        <div className="bridge-arrow"><ArrowRight className="bridge-icon"/></div>
        
        <div className="bridge-card">
          <div className="card-header">{language === 'ta' ? "இன்றைய சவால் (TODAY'S CHALLENGE)" : "TODAY'S CHALLENGE"}</div>
          <p>{connection?.challenge}</p>
        </div>
        
        <div className="bridge-arrow"><ArrowRight className="bridge-icon"/></div>
        
        <div className="bridge-card highlight">
          <div className="card-header">{language === 'ta' ? 'AI சாத்தியம் (AI POSSIBILITY)' : 'AI POSSIBILITY'}</div>
          <p>{connection?.aiAction}</p>
        </div>
      </div>

      <div className="bridge-actions">
        <button className="bt-action-btn" onClick={() => navigate('/classroom')}>
          <BookOpen size={16} /> {language === 'ta' ? 'தொடர்ந்து கற்க' : 'Continue Learning'}
        </button>
        <button className="bt-action-btn" onClick={() => navigate('/debate')}>
          <MessageSquare size={16} /> {language === 'ta' ? 'கருத்துகளை விவாதிக்க' : 'Challenge Ideas'}
        </button>
        <button className="bt-action-btn primary" onClick={() => navigate('/explore')}>
          <Zap size={16} /> {language === 'ta' ? 'பார்வையைச் செயல்படுத்த' : 'Apply the Vision'}
        </button>
      </div>
    </div>
  );
};

export default VisionBridge;
