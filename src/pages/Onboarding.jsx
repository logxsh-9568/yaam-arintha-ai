import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Onboarding.css';

const Onboarding = () => {
  const { setUserProfile, language } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    prefLang: 'en'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.level) {
      setUserProfile(formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="onboarding-page container">
      <div className="glass-card onboarding-card">
        <h2 className="onboarding-title gradient-text">
          {language === 'en' ? 'Welcome to Yaam Arintha AI' : 'யாம் அறிந்த AI இற்கு நல்வரவு'}
        </h2>
        <p className="onboarding-subtitle">
          {language === 'en' ? 'Let\'s personalize your learning experience.' : 'உங்கள் கற்றல் அனுபவத்தைத் தனிப்பயனாக்குவோம்.'}
        </p>

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="name">{language === 'en' ? 'Your Name' : 'உங்கள் பெயர்'}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={language === 'en' ? 'Enter your name' : 'பெயரை உள்ளிடுக'}
              required
            />
          </div>

          <div className="form-group">
            <label>{language === 'en' ? 'Learning Level' : 'கற்றல் நிலை'}</label>
            <div className="options-grid">
              {['School Student', 'College Student', 'Tamil Enthusiast'].map((level) => (
                <div 
                  key={level}
                  className={`option-card ${formData.level === level ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, level})}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>{language === 'en' ? 'Preferred AI Language' : 'விருப்பமான AI மொழி'}</label>
            <div className="options-grid">
              <div 
                className={`option-card ${formData.prefLang === 'ta' ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, prefLang: 'ta'})}
              >
                தமிழ்
              </div>
              <div 
                className={`option-card ${formData.prefLang === 'en' ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, prefLang: 'en'})}
              >
                English
              </div>
              <div 
                className={`option-card ${formData.prefLang === 'bi' ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, prefLang: 'bi'})}
              >
                Bilingual
              </div>
            </div>
          </div>

          <button type="submit" className="primary-btn submit-btn" disabled={!formData.name || !formData.level}>
            {language === 'en' ? 'Enter Classroom' : 'வகுப்பறைக்குள் நுழைய'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
