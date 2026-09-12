import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Volume2, MessageSquare, Play, HelpCircle, CheckCircle, BrainCircuit } from 'lucide-react';
import { lessonsData } from '../data/lessons';
import { getSmartResponse } from '../data/aiResponses';
import './AIClassroom.css';

const AIClassroom = () => {
  const { language, updateProgress } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [lesson] = useState(lessonsData[0]); // Defaulting to the first lesson for prototype
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const totalSteps = 6;

  useEffect(() => {
    // Initial Teacher Greeting
    const greeting = language === 'en' 
      ? "Welcome students! Today, we are going to learn a special poem."
      : "வணக்கம் மாணவர்களே! இன்று நாம் ஒரு சிறப்பான பாடலைக் கற்போம்.";
      
    setChatHistory([{ role: 'teacher', content: greeting }]);
  }, [language]);

  const handleStepChange = (step) => {
    setCurrentStep(step);
    let msg = "";
    if (step === 1) msg = language === 'en' ? "Let's read the poem." : "கவிதையை வாசிப்போம்.";
    if (step === 2) msg = language === 'en' ? "Let's understand the meaning." : "பொருளைப் புரிந்துகொள்வோம்.";
    if (step === 3) msg = language === 'en' ? "Here is the simple explanation." : "இதோ எளிய விளக்கம்.";
    if (step === 4) msg = language === 'en' ? "Let's look at the theme and values." : "மையக் கருத்தையும் மதிப்புகளையும் காண்போம்.";
    if (step === 5) msg = language === 'en' ? "Ask me any questions you have!" : "உங்களுக்கு உள்ள கேள்விகளை என்னிடம் கேளுங்கள்!";
    
    if (msg) {
      setIsTyping(true);
      setTimeout(() => {
        setChatHistory(prev => [...prev, { role: 'teacher', content: msg }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQuery = chatInput;
    setChatHistory(prev => [...prev, { role: 'student', content: userQuery }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getSmartResponse(userQuery, language);
      setChatHistory(prev => [...prev, { role: 'teacher', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleListen = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to set Tamil voice if available and requested
      if (language === 'ta') {
        utterance.lang = 'ta-IN';
      } else {
        utterance.lang = 'en-US';
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech Synthesis is not supported in this browser.");
    }
  };

  const finishLesson = () => {
    updateProgress('completedPoems', lesson.id);
    navigate('/quiz'); // Move to quiz after completing the lesson
  };

  return (
    <div className="classroom-page">
      <div className="classroom-container container">
        
        {/* Left Panel: Lesson Content */}
        <div className="lesson-panel glass-card">
          <div className="lesson-header">
            <span className="difficulty-badge">{lesson.difficulty}</span>
            <h2>{language === 'en' ? lesson.titleEnglish : lesson.titleTamil}</h2>
            <p className="theme-text">{lesson.theme}</p>
          </div>

          <div className="step-indicator">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={`step-dot ${currentStep > i + 1 ? 'completed' : currentStep === i + 1 ? 'active' : ''}`}
                onClick={() => currentStep >= i ? handleStepChange(i + 1) : null}
              ></div>
            ))}
          </div>

          <div className="lesson-content">
            {currentStep === 1 && (
              <div className="step-content active">
                <h3>{language === 'en' ? 'Original Poem' : 'மூலக்கவிதை'}</h3>
                <pre className="poem-text tamil-text">{lesson.shortExcerpt}</pre>
                <button className="secondary-btn icon-btn" onClick={() => handleListen(lesson.shortExcerpt)}>
                  <Volume2 size={20} /> {language === 'en' ? 'Listen' : 'கேட்க'}
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content active">
                <h3>{language === 'en' ? 'Simple Meaning' : 'எளிய விளக்கம்'}</h3>
                <p className="meaning-text">{language === 'en' ? lesson.englishMeaning : lesson.simpleTamilMeaning}</p>
                <button className="secondary-btn icon-btn" onClick={() => handleListen(language === 'en' ? lesson.englishMeaning : lesson.simpleTamilMeaning)}>
                  <Volume2 size={20} /> {language === 'en' ? 'Listen' : 'கேட்க'}
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content active">
                <h3>{language === 'en' ? 'Detailed English Translation' : 'ஆங்கில மொழிபெயர்ப்பு'}</h3>
                <p className="meaning-text">{lesson.englishMeaning}</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content active">
                <h3>{language === 'en' ? 'Theme & Values' : 'கருத்து மற்றும் மதிப்புகள்'}</h3>
                <div className="values-list">
                  {lesson.values.map(val => (
                    <span key={val} className="value-tag">{val}</span>
                  ))}
                </div>
                <div className="modern-relevance mt-4">
                  <h4>{language === 'en' ? 'Modern Relevance' : 'தற்கால தொடர்பு'}</h4>
                  <p>{lesson.modernRelevance}</p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="step-content active">
                <h3>{language === 'en' ? 'Visualize the Poem' : 'கவிதையை கற்பனை செய்க'}</h3>
                <div className="visualizer-mock">
                  <div className="abstract-art courage"></div>
                  <p className="art-caption">
                    {language === 'en' ? 'AI Interpretation: Rising sun over an immovable mountain, symbolizing inner strength.' : 'AI விளக்கம்: அசையாத மலையின் மீது உதிக்கும் சூரியன், மன வலிமையை குறிக்கிறது.'}
                  </p>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="step-content active complete-step">
                <CheckCircle size={64} className="text-gold mb-4" />
                <h3>{language === 'en' ? 'Lesson Completed!' : 'பாடம் நிறைவடைந்தது!'}</h3>
                <p>{language === 'en' ? 'Ready to test your knowledge?' : 'உங்கள் அறிவை சோதிக்க தயாரா?'}</p>
                <button className="primary-btn mt-4" onClick={finishLesson}>
                  {language === 'en' ? 'Take Quiz' : 'வினாடி வினா'}
                </button>
              </div>
            )}
          </div>

          <div className="step-navigation">
            <button 
              className="secondary-btn" 
              onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              {language === 'en' ? 'Previous' : 'முந்தைய'}
            </button>
            <button 
              className="primary-btn" 
              onClick={() => handleStepChange(Math.min(totalSteps, currentStep + 1))}
              disabled={currentStep === totalSteps}
            >
              {language === 'en' ? 'Next' : 'அடுத்த'}
            </button>
          </div>
        </div>

        {/* Right Panel: AI Teacher */}
        <div className="ai-panel glass-card">
          <div className="teacher-avatar">
            <div className="avatar-circle">
              {/* Stylized AI Teacher Icon representing Bharathiyar's aura */}
              <BrainCircuit size={60} color="var(--color-gold)" />
            </div>
            <div className="teacher-name">
              <span>{language === 'en' ? 'AI Bharathiyar' : 'AI பாரதியார்'}</span>
              <div className="typing-indicator" style={{ opacity: isTyping ? 1 : 0 }}>...</div>
            </div>
          </div>

          <div className="chat-area">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={handleAskAI}>
            <input 
              type="text" 
              placeholder={language === 'en' ? "Ask about the poem..." : "கவிதை பற்றி கேளுங்கள்..."}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <MessageSquare size={20} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AIClassroom;
