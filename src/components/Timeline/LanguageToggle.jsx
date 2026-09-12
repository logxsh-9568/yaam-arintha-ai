import React from 'react';
import '../../pages/BharathiTimeline.css';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="bt-lang-toggle">
      <button 
        className={language === 'ta' ? 'active' : ''} 
        onClick={() => setLanguage('ta')}
      >
        தமிழ்
      </button>
      <span>|</span>
      <button 
        className={language === 'en' ? 'active' : ''} 
        onClick={() => setLanguage('en')}
      >
        ENGLISH
      </button>
    </div>
  );
};

export default LanguageToggle;
