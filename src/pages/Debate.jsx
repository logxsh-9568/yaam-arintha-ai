import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Swords, Brain, Award } from 'lucide-react';
import './Debate.css';

const Debate = () => {
  const { language, updateProgress } = useContext(AppContext);
  const [topic, setTopic] = useState(null);
  const [argument, setArgument] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const debateTopics = [
    {
      id: 1,
      titleEn: "Fearlessness is essential for social progress.",
      titleTa: "சமூக முன்னேற்றத்திற்கு அச்சமின்மை அவசியம்.",
      aiArgumentEn: "I believe that fear is the root of all slavery. Only a society that has conquered fear can build true equality and justice. What is your argument?",
      aiArgumentTa: "பயமே அடிமைத்தனத்தின் ஆணிவேர் என நான் நம்புகிறேன். அச்சத்தை வென்ற சமூகத்தால் மட்டுமே உண்மையான சமத்துவத்தையும் நீதியையும் நிலைநாட்ட முடியும். உங்கள் வாதம் என்ன?"
    },
    {
      id: 2,
      titleEn: "Women should have equal access to education.",
      titleTa: "பெண்களுக்கு சமமான கல்வி உரிமை இருக்க வேண்டும்.",
      aiArgumentEn: "A bird cannot fly with one wing. Similarly, a nation cannot progress if its women are kept in darkness. Education is their fundamental right. Do you agree or have a different perspective?",
      aiArgumentTa: "ஒரு பறவையால் ஒரு சிறகைக் கொண்டு பறக்க முடியாது. அதேபோல, பெண்களை இருளில் வைத்திருக்கும் நாடு முன்னேற முடியாது. கல்வி அவர்களின் அடிப்படை உரிமை. நீங்கள் இதை எப்படி பார்க்கிறீர்கள்?"
    }
  ];

  const handleTopicSelect = (selected) => {
    setTopic(selected);
    setArgument('');
    setEvaluation(null);
  };

  const submitArgument = (e) => {
    e.preventDefault();
    if (argument.trim().length < 20) return;
    
    setIsEvaluating(true);
    
    // Mock Evaluation Algorithm
    setTimeout(() => {
      const lengthScore = Math.min(argument.length / 5, 20); // up to 20 pts
      const randomBase = 60 + Math.floor(Math.random() * 20); // 60-80 pts
      
      const relevance = Math.min(98, randomBase + lengthScore);
      const reasoning = Math.min(95, randomBase - 5 + lengthScore);
      const clarity = Math.min(99, randomBase + 2 + lengthScore);
      const impact = Math.min(94, randomBase - 2 + lengthScore);
      
      const overall = Math.round((relevance + reasoning + clarity + impact) / 4);
      
      setEvaluation({
        relevance: Math.round(relevance),
        reasoning: Math.round(reasoning),
        clarity: Math.round(clarity),
        impact: Math.round(impact),
        overall
      });
      
      updateProgress('debateScores', overall);
      setIsEvaluating(false);
    }, 2000);
  };

  return (
    <div className="debate-page container">
      <div className="debate-header text-center mb-4">
        <h1 className="gradient-text mb-4">
          <Swords size={40} className="inline-block mr-2" />
          {language === 'en' ? 'Debate with Bharathiyar' : 'பாரதியாருடன் விவாதம்'}
        </h1>
        <p className="subtitle">
          {language === 'en' 
            ? 'Challenge your ideas against an AI teacher inspired by Bharathiyar\'s vision.'
            : 'பாரதியாரின் தொலைநோக்கு சிந்தனையின் அடிப்படையில் AI ஆசிரியருடன் விவாதிக்கவும்.'}
        </p>
      </div>

      {!topic ? (
        <div className="topic-selection glass-card">
          <h2 className="section-title-sm text-center mb-4">
            {language === 'en' ? 'Select a Topic' : 'தலைப்பைத் தேர்ந்தெடுக்கவும்'}
          </h2>
          <div className="topics-grid">
            {debateTopics.map(t => (
              <button 
                key={t.id} 
                className="topic-card"
                onClick={() => handleTopicSelect(t)}
              >
                <Brain className="topic-icon" />
                <h3>{language === 'en' ? t.titleEn : t.titleTa}</h3>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="debate-arena">
          <button className="secondary-btn mb-4 sm" onClick={() => setTopic(null)}>
            {language === 'en' ? '← Back to Topics' : '← தலைப்புகளுக்கு திரும்பு'}
          </button>
          
          <div className="glass-card mb-4">
            <h3 className="text-gold mb-4 text-xl">{language === 'en' ? topic.titleEn : topic.titleTa}</h3>
            <div className="ai-argument">
              <div className="arg-header">
                <Brain size={20} />
                <span>{language === 'en' ? 'AI Bharathiyar says:' : 'AI பாரதியார் கூறுகிறார்:'}</span>
              </div>
              <p className="arg-text">"{language === 'en' ? topic.aiArgumentEn : topic.aiArgumentTa}"</p>
            </div>
          </div>

          {!evaluation ? (
            <div className="student-turn glass-card">
              <h3 className="mb-4">{language === 'en' ? 'Your Turn' : 'உங்கள் முறை'}</h3>
              <form onSubmit={submitArgument}>
                <textarea 
                  className="debate-textarea"
                  rows="6"
                  placeholder={language === 'en' ? "Construct your argument here..." : "உங்கள் வாதத்தை இங்கே பதிவு செய்க..."}
                  value={argument}
                  onChange={(e) => setArgument(e.target.value)}
                  disabled={isEvaluating}
                ></textarea>
                <div className="text-right mt-4">
                  <button 
                    type="submit" 
                    className="primary-btn" 
                    disabled={argument.length < 20 || isEvaluating}
                  >
                    {isEvaluating 
                      ? (language === 'en' ? 'Evaluating...' : 'மதிப்பீடு செய்யப்படுகிறது...') 
                      : (language === 'en' ? 'Submit Argument' : 'வாதத்தை சமர்ப்பி')}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="evaluation-card glass-card">
              <div className="eval-header text-center mb-4">
                <Award size={48} className="text-gold mx-auto mb-2" />
                <h2 className="gradient-text">{language === 'en' ? 'Evaluation Result' : 'மதிப்பீட்டு முடிவு'}</h2>
              </div>
              
              <div className="eval-scores">
                <div className="score-item">
                  <span className="label">{language === 'en' ? 'Relevance' : 'பொருத்தம்'}</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: `${evaluation.relevance}%`}}></div></div>
                  <span className="val">{evaluation.relevance}</span>
                </div>
                <div className="score-item">
                  <span className="label">{language === 'en' ? 'Reasoning' : 'காரணமறிதல்'}</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: `${evaluation.reasoning}%`}}></div></div>
                  <span className="val">{evaluation.reasoning}</span>
                </div>
                <div className="score-item">
                  <span className="label">{language === 'en' ? 'Clarity' : 'தெளிவு'}</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: `${evaluation.clarity}%`}}></div></div>
                  <span className="val">{evaluation.clarity}</span>
                </div>
                <div className="score-item">
                  <span className="label">{language === 'en' ? 'Impact' : 'தாக்கம்'}</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: `${evaluation.impact}%`}}></div></div>
                  <span className="val">{evaluation.impact}</span>
                </div>
              </div>
              
              <div className="overall-score text-center mt-4 pt-4">
                <h3>{language === 'en' ? 'Overall Score' : 'மொத்த மதிப்பெண்'}</h3>
                <div className="big-score">{evaluation.overall}/100</div>
                <p className="feedback text-muted mt-2">
                  {evaluation.overall > 85 
                    ? (language === 'en' ? "Excellent argument! Your reasoning aligns closely with the vision of progress." : "சிறப்பான வாதம்! உங்கள் சிந்தனை முற்போக்கான பார்வையை கொண்டுள்ளது.")
                    : (language === 'en' ? "Good effort. Try to provide more concrete examples in your reasoning." : "நல்ல முயற்சி. இன்னும் சில தெளிவான காரணங்களை சேர்க்கலாம்.")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Debate;
