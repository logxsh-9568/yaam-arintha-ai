import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { lessonsData, exploreCategories } from '../data/lessons';
import { BookOpen } from 'lucide-react';
import './Explore.css';

const Explore = () => {
  const { language } = useContext(AppContext);

  return (
    <div className="explore-page container">
      <div className="explore-header text-center mb-4">
        <h1 className="gradient-text mb-4">
          {language === 'en' ? 'Explore Bharathiyar' : 'பாரதியாரை அறிவோம்'}
        </h1>
        <p className="subtitle">
          {language === 'en' 
            ? 'Discover poems categorized by their core themes and ideas.'
            : 'முக்கிய கருப்பொருள்கள் அடிப்படையில் கவிதைகளை ஆராயுங்கள்.'}
        </p>
      </div>

      <div className="categories-list mb-4">
        {exploreCategories.map(cat => (
          <span key={cat} className="category-pill">{cat}</span>
        ))}
      </div>

      <div className="poems-grid">
        {lessonsData.map(lesson => (
          <div key={lesson.id} className="glass-card poem-card">
            <div className="poem-card-header">
              <span className="difficulty-badge">{lesson.difficulty}</span>
              <span className="theme-text">{lesson.theme}</span>
            </div>
            <h3 className="poem-title mt-4 mb-2">
              {language === 'en' ? lesson.titleEnglish : lesson.titleTamil}
            </h3>
            <p className="poem-excerpt tamil-text mb-4">
              "{lesson.shortExcerpt.split('\n')[0]}..."
            </p>
            <div className="poem-card-footer mt-4">
              <Link to={`/classroom`} className="secondary-btn w-100 flex justify-center items-center gap-2">
                <BookOpen size={18} />
                {language === 'en' ? 'Learn Poem' : 'கவிதை கற்க'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
