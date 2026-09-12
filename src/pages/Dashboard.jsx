import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, Flame, TrendingUp } from 'lucide-react';
import { lessonsData } from '../data/lessons';
import './Dashboard.css';

const Dashboard = () => {
  const { userProfile, progress, language } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      navigate('/onboarding');
    }
  }, [userProfile, navigate]);

  if (!userProfile) return null;

  const t = {
    greeting: language === 'en' ? 'Vanakkam' : 'வணக்கம்',
    poemsCompleted: language === 'en' ? 'Poems Completed' : 'முடித்த கவிதைகள்',
    quizAvg: language === 'en' ? 'Quiz Average' : 'வினாடி வினா சராசரி',
    streak: language === 'en' ? 'Learning Streak' : 'தொடர் கற்றல்',
    level: language === 'en' ? 'Learning Level' : 'கற்றல் நிலை',
    continue: language === 'en' ? 'Continue Learning' : 'கற்றலைத் தொடர',
    recommended: language === 'en' ? 'Recommended Lesson' : 'பரிந்துரைக்கப்பட்ட பாடம்',
    achievements: language === 'en' ? 'Achievements' : 'சாதனைகள்'
  };

  const avgScore = progress.quizScores.length > 0 
    ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)
    : 0;

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header">
        <h1 className="gradient-text">{t.greeting}, {userProfile.name}!</h1>
        <p className="subtitle">{userProfile.level}</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <BookOpen className="stat-icon" />
          <div className="stat-info">
            <h3>{progress.completedPoems.length}</h3>
            <p>{t.poemsCompleted}</p>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <TrendingUp className="stat-icon" />
          <div className="stat-info">
            <h3>{avgScore}%</h3>
            <p>{t.quizAvg}</p>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <Flame className="stat-icon fire" />
          <div className="stat-info">
            <h3>{progress.learningStreak} {language === 'en' ? 'Days' : 'நாட்கள்'}</h3>
            <p>{t.streak}</p>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <Award className="stat-icon gold" />
          <div className="stat-info">
            <h3>{progress.badges.length}</h3>
            <p>{t.achievements}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="continue-learning glass-card">
          <h2 className="section-title-sm">{t.continue}</h2>
          <div className="recommended-lesson">
            <div className="lesson-info">
              <span className="badge-sm">{t.recommended}</span>
              <h3>{language === 'en' ? lessonsData[0].titleEnglish : lessonsData[0].titleTamil}</h3>
              <p>{language === 'en' ? lessonsData[0].theme : 'வீரம் மற்றும் தைரியம்'}</p>
            </div>
            <div className="lesson-action">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '0%' }}></div>
              </div>
              <Link to={`/classroom`} className="primary-btn sm">
                {language === 'en' ? 'Start' : 'தொடங்கு'}
              </Link>
            </div>
          </div>
        </div>

        <div className="achievements-section glass-card">
          <h2 className="section-title-sm">{t.achievements}</h2>
          <div className="badges-grid">
            {['Tamil Explorer', 'Bharathi Learner', 'Bharathi Scholar', 'Mahakavi Champion'].map((badge, idx) => {
              const isEarned = progress.badges.includes(badge);
              return (
                <div key={badge} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                  <div className="badge-icon-wrapper">
                    <Award size={32} />
                  </div>
                  <p>{badge}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
