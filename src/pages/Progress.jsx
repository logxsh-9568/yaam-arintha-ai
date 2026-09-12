import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, Flame, TrendingUp } from 'lucide-react';
import './Progress.css';

const Progress = () => {
  const { userProfile, progress, language } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) navigate('/onboarding');
  }, [userProfile, navigate]);

  if (!userProfile) return null;

  const avgScore = progress.quizScores.length > 0 
    ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)
    : 0;

  const debateAvg = progress.debateScores.length > 0
    ? Math.round(progress.debateScores.reduce((a, b) => a + b, 0) / progress.debateScores.length)
    : 0;

  return (
    <div className="progress-page container">
      <div className="text-center mb-4">
        <h1 className="gradient-text">{language === 'en' ? 'My Learning Journey' : 'எனது கற்றல் பயணம்'}</h1>
        <p className="subtitle">{userProfile.name} • {userProfile.level}</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card text-center flex-col justify-center">
          <BookOpen className="stat-icon mx-auto mb-2" />
          <h3>{progress.completedPoems.length}</h3>
          <p>{language === 'en' ? 'Poems Completed' : 'முடித்த கவிதைகள்'}</p>
        </div>
        
        <div className="glass-card stat-card text-center flex-col justify-center">
          <TrendingUp className="stat-icon mx-auto mb-2" />
          <h3>{avgScore}%</h3>
          <p>{language === 'en' ? 'Quiz Average' : 'வினாடி வினா சராசரி'}</p>
        </div>
        
        <div className="glass-card stat-card text-center flex-col justify-center">
          <Flame className="stat-icon fire mx-auto mb-2" />
          <h3>{progress.learningStreak}</h3>
          <p>{language === 'en' ? 'Day Streak' : 'தொடர் கற்றல்'}</p>
        </div>
        
        <div className="glass-card stat-card text-center flex-col justify-center">
          <Award className="stat-icon gold mx-auto mb-2" />
          <h3>{debateAvg}%</h3>
          <p>{language === 'en' ? 'Debate Average' : 'விவாத சராசரி'}</p>
        </div>
      </div>

      <div className="glass-card mb-4 mt-4">
        <h2 className="section-title-sm mb-4">{language === 'en' ? 'Mission Bharathi Progress' : 'மிஷன் பாரதி முன்னேற்றம்'}</h2>
        <div className="missions-list">
          {[
            { id: 1, nameEn: 'Complete your first poem', nameTa: 'முதல் கவிதையை முடிக்கவும்', done: progress.completedPoems.length > 0 },
            { id: 2, nameEn: 'Score 100% in a quiz', nameTa: 'வினாடி வினாவில் 100% எடுக்கவும்', done: progress.badges.includes('Bharathi Scholar') },
            { id: 3, nameEn: 'Participate in a Debate', nameTa: 'விவாதத்தில் பங்கேற்கவும்', done: progress.debateScores.length > 0 }
          ].map(m => (
            <div key={m.id} className={`mission-item ${m.done ? 'done' : ''}`}>
              <div className="mission-checkbox">
                {m.done && <Award size={16} />}
              </div>
              <span className="mission-name">{language === 'en' ? m.nameEn : m.nameTa}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
