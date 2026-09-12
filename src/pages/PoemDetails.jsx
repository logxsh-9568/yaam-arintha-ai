import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { bharathiWorks } from '../data/bharathiWorks';
import { Volume2, Play, CheckCircle, BrainCircuit, MessageSquare, ArrowLeft } from 'lucide-react';
import './PoemDetails.css';

const PoemDetails = () => {
  const { poemId } = useParams();
  const navigate = useNavigate();
  const { language, updateProgress, progress } = useContext(AppContext);
  const work = bharathiWorks.find(w => w.id === poemId);

  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'quiz'
  const [quizScore, setQuizScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!work) return;
    const greeting = language === 'en' 
      ? `Welcome! Let's learn about "${work.titleEnglish}". Ask me anything!`
      : `வணக்கம்! "${work.titleTamil}" கவிதையை பற்றி கற்போம். உங்கள் கேள்விகளை கேளுங்கள்!`;
    setChatHistory([{ role: 'teacher', content: greeting }]);
  }, [language, work]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  if (!work) {
    return (
      <div className="container text-center py-5">
        <h2>Poem not found.</h2>
        <button className="primary-btn mt-4" onClick={() => navigate('/explore')}>Go Back</button>
      </div>
    );
  }

  const isCompleted = progress.completedPoems && progress.completedPoems.includes(work.id);

  const handleListen = (text, langCode) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech Synthesis is not supported in this browser.");
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
      let response = language === 'en' 
        ? `This poem focuses on ${work.themes[0]}. Bharathiyar wanted to convey a strong message to society. What else would you like to know?`
        : `இந்த கவிதை ${work.themes[0]} பற்றியது. பாரதியார் சமுதாயத்திற்கு ஒரு வலுவான கருத்தை சொல்ல விரும்பினார். வேறு என்ன கேட்க விரும்புகிறீர்கள்?`;
      
      const lowerQ = userQuery.toLowerCase();
      if (lowerQ.includes('mean') || lowerQ.includes('பொருள்') || lowerQ.includes('விளக்கம்')) {
        response = language === 'en' ? work.meaningEnglish : work.shortMeaningTamil;
      } else if (lowerQ.includes('theme') || lowerQ.includes('கருத்து')) {
        response = language === 'en' ? `The main themes are ${work.themes.join(', ')}.` : `முக்கிய கருத்துக்கள்: ${work.themes.join(', ')}.`;
      }
      
      setChatHistory(prev => [...prev, { role: 'teacher', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    work.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) score++;
    });
    setQuizScore(score);
    const percentage = Math.round((score / work.quiz.length) * 100);
    updateProgress('quizScores', percentage);
  };

  const markComplete = () => {
    updateProgress('completedPoems', work.id);
  };

  return (
    <div className="poem-details-page container py-4">
      <button className="back-btn flex items-center gap-2 text-muted mb-4 hover:text-white bg-transparent border-none cursor-pointer" onClick={() => navigate('/explore')}>
        <ArrowLeft size={16} /> {language === 'en' ? 'Back to Library' : 'நூலகத்திற்கு திரும்பு'}
      </button>

      <div className="details-layout">
        <div className="main-content-panel">
          <div className="glass-card mb-4 p-5 h-full">
            <span className="category-text text-gold font-semibold uppercase text-xs tracking-wider d-block mb-2">{work.category}</span>
            <h1 className="poem-title-ta mt-2 text-3xl font-bold mb-1">{work.titleTamil}</h1>
            <h2 className="poem-title-en text-muted text-xl mb-5 font-medium">{work.titleEnglish}</h2>
            
            <div className="tabs flex gap-4 border-b border-white/10 pb-3 mb-5">
              <button 
                className={`tab-btn bg-transparent border-none cursor-pointer font-semibold text-lg transition-colors ${activeTab === 'learn' ? 'text-gold' : 'text-muted hover:text-white'}`}
                onClick={() => setActiveTab('learn')}
              >
                {language === 'en' ? 'Learn Poem' : 'கவிதை கற்க'}
              </button>
              <button 
                className={`tab-btn bg-transparent border-none cursor-pointer font-semibold text-lg transition-colors ${activeTab === 'quiz' ? 'text-gold' : 'text-muted hover:text-white'}`}
                onClick={() => setActiveTab('quiz')}
              >
                {language === 'en' ? 'Take Quiz' : 'வினாடி வினா'}
              </button>
            </div>

            {activeTab === 'learn' && (
              <div className="learn-section animation-fade">
                <div className="excerpt-box p-4 mb-5 bg-white/5 border-l-4 border-gold rounded-r-lg relative shadow-inner">
                  <pre className="poem-text tamil-text text-lg whitespace-pre-wrap font-sans leading-relaxed">{work.excerptTamil}</pre>
                  <div className="listen-controls flex gap-3 mt-4">
                    <button className="secondary-btn btn-sm flex items-center gap-2 py-1 px-3 text-sm rounded-md" onClick={() => handleListen(work.excerptTamil, 'ta-IN')}>
                      <Volume2 size={16} /> Tamil
                    </button>
                    <button className="secondary-btn btn-sm flex items-center gap-2 py-1 px-3 text-sm rounded-md" onClick={() => handleListen(work.meaningEnglish, 'en-IN')}>
                      <Volume2 size={16} /> English
                    </button>
                  </div>
                </div>

                <div className="meanings-grid flex flex-col md-flex-row gap-4 mb-6">
                  <div className="meaning-card bg-black/30 p-5 rounded-lg flex-1 border border-white/5">
                    <h3 className="text-gold mb-3 font-semibold text-lg">{language === 'en' ? 'Simple Meaning' : 'எளிய விளக்கம்'}</h3>
                    <p className="leading-relaxed text-[0.95rem]">{work.shortMeaningTamil}</p>
                  </div>
                  <div className="meaning-card bg-black/30 p-5 rounded-lg flex-1 border border-white/5">
                    <h3 className="text-gold mb-3 font-semibold text-lg">English Meaning</h3>
                    <p className="leading-relaxed text-[0.95rem]">{work.meaningEnglish}</p>
                  </div>
                </div>

                <div className="analysis-section bg-black/30 p-5 rounded-lg mb-6 border border-white/5">
                  <h3 className="text-gold mb-3 font-semibold text-lg">{language === 'en' ? 'Theme & Values' : 'கருத்து மற்றும் மதிப்புகள்'}</h3>
                  <div className="values-row flex flex-wrap gap-2 mb-5">
                    {work.values.map(val => (
                      <span key={val} className="value-tag px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">{val}</span>
                    ))}
                  </div>
                  <h4 className="text-md font-semibold text-white mb-2">{language === 'en' ? 'Modern Relevance' : 'தற்கால தொடர்பு'}</h4>
                  <p className="text-muted leading-relaxed text-[0.95rem]">{work.modernRelevance}</p>
                </div>

                <div className="completion-action text-center mt-6 pt-4 border-t border-white/10">
                  {isCompleted ? (
                    <div className="completed-badge inline-flex items-center gap-2 text-green-400 bg-green-400/10 px-6 py-3 rounded-full font-bold">
                      <CheckCircle size={20} /> {language === 'en' ? 'Completed!' : 'நிறைவடைந்தது!'}
                    </div>
                  ) : (
                    <button className="primary-btn flex items-center justify-center gap-2 mx-auto px-8 py-3 text-lg" onClick={markComplete}>
                      <CheckCircle size={20} /> {language === 'en' ? 'Mark Complete' : 'முடித்ததாக குறி'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-section animation-fade">
                {quizScore === null ? (
                  <div className="quiz-questions flex flex-col gap-5">
                    <h3 className="text-xl text-gold mb-2 font-bold">{language === 'en' ? 'Test your understanding' : 'உங்கள் அறிவை சோதிக்கவும்'}</h3>
                    {work.quiz.map((q, idx) => (
                      <div key={idx} className="quiz-card bg-black/30 p-5 rounded-lg border border-white/5">
                        <p className="font-semibold mb-4 text-lg">{idx + 1}. {q.question}</p>
                        <div className="options-grid flex flex-col sm-grid-cols-2 gap-3">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              className={`quiz-option text-left p-4 rounded-md border transition-all ${userAnswers[idx] === oIdx ? 'bg-gold/20 border-gold text-white font-medium shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-200'}`}
                              onClick={() => setUserAnswers({...userAnswers, [idx]: oIdx})}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-6">
                      <button 
                        className="primary-btn px-8 py-3 text-lg w-full max-w-xs opacity-disabled"
                        disabled={Object.keys(userAnswers).length !== work.quiz.length}
                        onClick={handleQuizSubmit}
                      >
                        {language === 'en' ? 'Submit Quiz' : 'சமர்ப்பி'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="quiz-result text-center py-10">
                    <div className="score-circle mx-auto w-32 h-32 rounded-full border-4 border-gold flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-black/40">
                      <span className="text-4xl font-bold text-gold">{quizScore}/{work.quiz.length}</span>
                    </div>
                    <h3 className="text-3xl mb-3 font-bold">{language === 'en' ? 'Quiz Completed!' : 'வினாடி வினா முடிந்தது!'}</h3>
                    <p className="text-muted mb-8 text-lg">{language === 'en' ? 'Your score has been saved to your progress.' : 'உங்கள் மதிப்பெண் சேமிக்கப்பட்டது.'}</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <button className="secondary-btn px-6 py-2" onClick={() => { setQuizScore(null); setUserAnswers({}); }}>
                        {language === 'en' ? 'Retry Quiz' : 'மீண்டும் முயற்சி செய்'}
                      </button>
                      <button className="primary-btn px-6 py-2" onClick={() => { markComplete(); setActiveTab('learn'); }}>
                        {language === 'en' ? 'Return to Lesson' : 'பாடத்திற்கு திரும்பு'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ai-panel-wrapper">
          <div className="ai-panel glass-card h-[600px] flex flex-col p-4">
            <div className="teacher-avatar flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="avatar-circle w-12 h-12 rounded-full bg-gold/20 flex justify-center items-center border border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <BrainCircuit size={24} color="var(--color-gold)" />
              </div>
              <div className="teacher-name">
                <span className="font-bold text-gold d-block text-lg">{language === 'en' ? 'AI Bharathiyar' : 'AI பாரதியார்'}</span>
                <span className="text-xs text-muted font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/10">AI Interpretation</span>
              </div>
            </div>

            <div className="chat-area flex-1 overflow-y-auto py-4 flex flex-col gap-3 pr-2 custom-scrollbar">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-bubble max-w-[85%] p-3 rounded-2xl text-[0.95rem] leading-relaxed shadow-sm ${msg.role === 'teacher' ? 'bg-gold/10 border border-gold/20 rounded-tl-sm self-start text-gray-100' : 'bg-white/10 border border-white/10 rounded-tr-sm self-end text-white'}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble teacher bg-gold/10 border border-gold/20 rounded-2xl rounded-tl-sm self-start p-3 max-w-[85%] flex items-center justify-center min-h-[40px] min-w-[50px]">
                  <div className="typing-dots flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-input-area border-t border-white/10 pt-4 flex gap-2" onSubmit={handleAskAI}>
              <input 
                type="text" 
                className="flex-1 bg-black/40 border border-white/20 rounded-full px-4 py-2 text-white text-[0.95rem] focus:outline-none focus:border-gold transition-colors"
                placeholder={language === 'en' ? "Ask about the poem..." : "கவிதை பற்றி கேளுங்கள்..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="send-btn w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF9933] flex justify-center items-center text-black hover:scale-105 transition-transform border-none cursor-pointer flex-shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <MessageSquare size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemDetails;
