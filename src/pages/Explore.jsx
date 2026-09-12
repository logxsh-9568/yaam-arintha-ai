import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { bharathiWorks, exploreCategories } from '../data/bharathiWorks';
import { BookOpen, Search, Filter, Bookmark, Heart, ChevronDown } from 'lucide-react';
import './Explore.css';

const Explore = () => {
  const { language, progress } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortMethod, setSortMethod] = useState('Featured');
  const [loadedCount, setLoadedCount] = useState(12);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('yaam_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('yaam_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const categoriesToTamil = {
    "All": "அனைத்தும்",
    "Fearlessness": "அச்சமின்மை",
    "Freedom": "சுதந்திரம்",
    "Patriotism": "தேசப்பற்று",
    "Women Empowerment": "பெண்கள் விடுதலை",
    "Education": "கல்வி",
    "Equality": "சமத்துவம்",
    "Social Reform": "சமூக சீர்திருத்தம்",
    "Nature": "இயற்கை",
    "Love": "காதல்",
    "Devotion": "பக்தி",
    "Spirituality": "ஆன்மீகம்"
  };

  const getCategoryName = (cat) => language === 'en' ? cat : (categoriesToTamil[cat] || cat);

  // Filter and sort logic
  const filteredWorks = useMemo(() => {
    let result = bharathiWorks;

    // Category filter
    if (activeCategory !== 'All') {
      if (activeCategory === 'Favorites') {
        result = result.filter(work => favorites.includes(work.id));
      } else {
        result = result.filter(work => work.category === activeCategory);
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(work => 
        work.titleTamil.toLowerCase().includes(lowerQuery) ||
        work.titleEnglish.toLowerCase().includes(lowerQuery) ||
        work.category.toLowerCase().includes(lowerQuery) ||
        work.themes.some(t => t.toLowerCase().includes(lowerQuery)) ||
        (work.keywords && work.keywords.some(k => k.toLowerCase().includes(lowerQuery)))
      );
    }

    // Sort logic
    if (sortMethod === 'A-Z') {
      result = [...result].sort((a, b) => a.titleEnglish.localeCompare(b.titleEnglish));
    } else if (sortMethod === 'Tamil Title') {
      result = [...result].sort((a, b) => a.titleTamil.localeCompare(b.titleTamil));
    } else if (sortMethod === 'Difficulty') {
      const diffMap = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
      result = [...result].sort((a, b) => diffMap[a.difficulty] - diffMap[b.difficulty]);
    }

    return result;
  }, [searchQuery, activeCategory, sortMethod, favorites]);

  const displayedWorks = filteredWorks.slice(0, loadedCount);

  const handleLoadMore = () => {
    setLoadedCount(prev => prev + 12);
  };

  const totalWorks = bharathiWorks.length;
  const totalThemes = new Set(bharathiWorks.flatMap(w => w.themes)).size;
  const completedCount = progress.completedPoems ? progress.completedPoems.length : 0;

  return (
    <div className="explore-page container">
      <div className="explore-header text-center mb-4 mt-4">
        <span className="collection-badge mb-2 d-inline-block">
          {language === 'en' ? 'BHARATHIYAR LITERARY COLLECTION' : 'பாரதியார் இலக்கிய தொகுப்பு'}
        </span>
        <h1 className="gradient-text mb-2">
          {language === 'en' ? 'Explore Bharathiyar' : 'பாரதியாரை ஆராயுங்கள்'}
        </h1>
        <p className="subtitle mx-auto">
          {language === 'en' 
            ? "Discover Bharathiyar's poems, songs, ideas and literary works through an AI-powered learning experience."
            : 'பாரதியாரின் கவிதைகள், பாடல்கள், மற்றும் கருத்துக்களை AI வழியே ஆராயுங்கள்.'}
        </p>
      </div>

      <div className="collection-stats flex justify-center gap-4 mb-5">
        <div className="stat-box glass-card">
          <h4>{totalWorks}</h4>
          <span>{language === 'en' ? 'Total Works' : 'மொத்த படைப்புகள்'}</span>
        </div>
        <div className="stat-box glass-card">
          <h4>{totalThemes}</h4>
          <span>{language === 'en' ? 'Themes' : 'கருப்பொருள்கள்'}</span>
        </div>
        <div className="stat-box glass-card">
          <h4>{completedCount}</h4>
          <span>{language === 'en' ? 'Completed' : 'முடித்தவை'}</span>
        </div>
        <div className="stat-box glass-card">
          <h4>{favorites.length}</h4>
          <span>{language === 'en' ? 'Favorites' : 'விருப்பமானவை'}</span>
        </div>
      </div>

      <div className="explore-controls glass-card mb-4 p-4">
        <div className="search-bar-wrapper">
          <Search className="search-icon" size={20} />
          <input 
            type="text"
            className="search-input"
            placeholder={language === 'en' ? "Search poems, themes, titles or keywords..." : "கவிதைகள், தலைப்புகள், கருத்துக்களை தேடுக..."}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLoadedCount(12);
            }}
          />
        </div>
        
        <div className="controls-row flex justify-between items-center mt-4">
          <div className="categories-filter flex gap-2 flex-wrap">
            {['All', ...exploreCategories.filter(c => c !== 'All'), 'Favorites'].map(cat => (
              <button 
                key={cat} 
                className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setLoadedCount(12);
                }}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>

          <div className="sort-dropdown-wrapper flex items-center gap-2 mt-2 mt-md-0">
            <span className="text-muted text-sm">{language === 'en' ? 'Sort:' : 'வரிசை:'}</span>
            <select 
              className="sort-dropdown"
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
            >
              <option value="Featured">{language === 'en' ? 'Featured' : 'முக்கியமானவை'}</option>
              <option value="A-Z">{language === 'en' ? 'A-Z' : 'ஆங்கில அகரவரிசை'}</option>
              <option value="Tamil Title">{language === 'en' ? 'Tamil Title' : 'தமிழ் அகரவரிசை'}</option>
              <option value="Difficulty">{language === 'en' ? 'Difficulty' : 'கடினத்தன்மை'}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-count mb-4 font-semibold text-gold">
        {language === 'en' ? `Showing ${filteredWorks.length} verified works` : `${filteredWorks.length} படைப்புகள் காணப்படுகின்றன`}
      </div>

      {filteredWorks.length === 0 && (
        <div className="empty-state glass-card text-center py-5">
          <h3 className="mb-2">{language === 'en' ? 'No Bharathiyar works found.' : 'எந்த படைப்புகளும் கிடைக்கவில்லை.'}</h3>
          <p className="text-muted mb-4">{language === 'en' ? 'Try another title, theme or keyword.' : 'வேறு தேடல் சொற்களை பயன்படுத்தவும்.'}</p>
          <button className="secondary-btn" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            {language === 'en' ? 'Clear Search' : 'தேடலை நீக்கு'}
          </button>
        </div>
      )}

      <div className="library-grid">
        {displayedWorks.map(work => (
          <div key={work.id} className="glass-card library-card flex flex-col h-full">
            <div className="card-header flex justify-between items-start mb-3">
              <span className={`difficulty-badge diff-${work.difficulty.toLowerCase()}`}>
                {work.difficulty}
              </span>
              <button 
                className="fav-btn" 
                onClick={() => toggleFavorite(work.id)}
                aria-label="Toggle Favorite"
              >
                <Heart size={20} className={favorites.includes(work.id) ? "fill-gold text-gold" : "text-muted"} fill={favorites.includes(work.id) ? "currentColor" : "none"} />
              </button>
            </div>
            
            <div className="card-body flex-1">
              <span className="category-text text-sm text-gold mb-1 d-block font-semibold uppercase tracking-wider">{getCategoryName(work.category)}</span>
              <h3 className="poem-title-ta mb-1 text-xl">{work.titleTamil}</h3>
              <h4 className="poem-title-en text-muted mb-3 text-md">{work.titleEnglish}</h4>
              
              <div className="excerpt-box mb-4">
                <p className="poem-excerpt tamil-text text-sm italic opacity-80">
                  "{work.excerptTamil.split('\n')[0]}..."
                </p>
              </div>

              <div className="themes-row flex gap-2 flex-wrap mb-4">
                {work.themes.slice(0, 2).map(theme => (
                  <span key={theme} className="theme-tag px-2 py-1 bg-white/5 rounded-md text-xs border border-white/10">
                    {language === 'en' ? theme : categoriesToTamil[theme] || theme}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-footer mt-auto pt-4 border-t border-white/10">
              <Link to={`/explore/${work.id}`} className="primary-btn w-100 flex justify-center items-center gap-2">
                <BookOpen size={18} />
                {language === 'en' ? 'Learn Poem →' : 'கவிதையை கற்க →'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loadedCount < filteredWorks.length && (
        <div className="load-more-section text-center mt-5 mb-5">
          <p className="text-muted text-sm mb-3">
            {language === 'en' ? `Showing ${displayedWorks.length} of ${filteredWorks.length} works` : `${displayedWorks.length} / ${filteredWorks.length} படைப்புகள்`}
          </p>
          <button className="secondary-btn" onClick={handleLoadMore}>
            {language === 'en' ? 'Load More Works' : 'மேலும் காண'}
          </button>
        </div>
      )}
      
      <div className="footer-note text-center mt-5 mb-2 text-muted text-xs opacity-60">
        {language === 'en' ? '* Content is curated from verified literary and historical sources.' : '* உள்ளடக்கங்கள் சரிபார்க்கப்பட்ட இலக்கிய மற்றும் வரலாற்று ஆதாரங்களில் இருந்து தொகுக்கப்பட்டவை.'}
      </div>
    </div>
  );
};

export default Explore;
