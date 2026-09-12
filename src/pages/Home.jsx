import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, Mic, Lightbulb } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/onboarding');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge">
              <span className="badge-text">MAHAKAVI GEN FEST • 2026</span>
            </div>
            
            <h1 className="hero-title">
              <span className="gradient-text">YAAM ARINTHA AI</span>
            </h1>
            
            <h2 className="hero-subtitle">
              {language === 'en' 
                ? "Where Tamil Heritage Meets Generative Intelligence" 
                : "தமிழ் பாரம்பரியமும் செயற்கை நுண்ணறிவும் இணையும் இடம்"}
            </h2>
            
            <p className="hero-desc">
              {language === 'en'
                ? "An interactive AI-powered learning platform that brings Mahakavi Bharathiyar's poems, ideas and vision closer to today's generation."
                : "மகாகவி பாரதியாரின் கவிதைகள், கருத்துக்கள் மற்றும் தொலைநோக்கு சிந்தனைகளை இன்றைய தலைமுறையினரிடம் கொண்டு சேர்க்கும் ஒரு செயற்கை நுண்ணறிவு கற்றல் தளம்."}
            </p>
            
            <div className="hero-actions">
              <button className="primary-btn hero-btn" onClick={handleStart}>
                {language === 'en' ? 'Start Learning' : 'கற்க தொடங்கு'}
              </button>
              <Link to="/explore" className="secondary-btn hero-btn">
                {language === 'en' ? 'Explore Bharathiyar' : 'பாரதியாரை அறிவோம்'}
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="ai-concept-circle">
              <div className="ai-core"></div>
              <div className="orbiting-elements">
                <div className="element t-1"><BookOpen size={24} /></div>
                <div className="element t-2"><Sparkles size={24} /></div>
                <div className="element t-3"><Mic size={24} /></div>
                <div className="element t-4"><Lightbulb size={24} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h3 className="section-title">
          {language === 'en' ? 'Why Yaam Arintha AI?' : 'ஏன் யாம் அறிந்த AI?'}
        </h3>
        
        <div className="features-grid">
          <div className="glass-card feature-card">
            <BookOpen className="feature-icon" />
            <h4>{language === 'en' ? 'Learn Tamil Literature' : 'தமிழ் இலக்கியம் கற்க'}</h4>
            <p>{language === 'en' ? 'Experience classic poems with simple, contextual meanings.' : 'பழங்கால கவிதைகளை எளிய விளக்கங்களுடன் கற்கலாம்.'}</p>
          </div>
          
          <div className="glass-card feature-card">
            <Sparkles className="feature-icon" />
            <h4>{language === 'en' ? 'Understand Bharathiyar' : 'பாரதியை அறிய'}</h4>
            <p>{language === 'en' ? 'Dive deep into his visionary thoughts and ideology.' : 'அவரது தொலைநோக்கு சிந்தனைகளை ஆழமாக அறியலாம்.'}</p>
          </div>
          
          <div className="glass-card feature-card">
            <Mic className="feature-icon" />
            <h4>{language === 'en' ? 'Interact with AI' : 'AI உடன் உரையாட'}</h4>
            <p>{language === 'en' ? 'Ask questions, debate, and learn interactively.' : 'கேள்விகள் கேட்டு, விவாதித்து ஊடாடும் வகையில் கற்கலாம்.'}</p>
          </div>
          
          <div className="glass-card feature-card">
            <Lightbulb className="feature-icon" />
            <h4>{language === 'en' ? 'Apply His Vision Today' : 'இன்றைய காலகட்டத்திற்கு'}</h4>
            <p>{language === 'en' ? 'Connect historical wisdom with modern day challenges.' : 'வரலாற்று அறிவை இன்றைய சவால்களுடன் இணைக்கலாம்.'}</p>
          </div>
        </div>
      </section>

      {/* Vision to Action Section */}
      <section className="vision-section container">
        <h3 className="section-title">
          {language === 'en' ? "From Bharathiyar's Words to Today's World" : 'பாரதியின் வார்த்தைகளில் இருந்து இன்றைய உலகிற்கு'}
        </h3>
        
        <div className="vision-flow">
          <div className="vision-step">
            <div className="step-number">1</div>
            <h5>VISION</h5>
          </div>
          <div className="vision-arrow">→</div>
          <div className="vision-step">
            <div className="step-number">2</div>
            <h5>UNDERSTANDING</h5>
          </div>
          <div className="vision-arrow">→</div>
          <div className="vision-step highlight">
            <div className="step-number">3</div>
            <h5>AI</h5>
          </div>
          <div className="vision-arrow">→</div>
          <div className="vision-step">
            <div className="step-number">4</div>
            <h5>ACTION</h5>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
