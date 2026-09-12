import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { language, toggleLanguage, userProfile } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: { en: 'Home', ta: 'முகப்பு' } },
    { path: '/explore', label: { en: 'Explore', ta: 'ஆய்வு' } },
    { path: '/bharathi-timeline', label: { en: <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#d4af37', fontWeight: 'bold' }}><Clock size={16}/> BHARATHI TIMELINE</span>, ta: <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#d4af37', fontWeight: 'bold' }}><Clock size={16}/> பாரதி காலக்கோடு</span> }, isSpecial: true },
    { path: '/classroom', label: { en: 'AI Classroom', ta: 'AI வகுப்பறை' } },
    { path: '/debate', label: { en: 'Debate', ta: 'விவாதம்' } },
    { path: '/progress', label: { en: 'Progress', ta: 'முன்னேற்றம்' } }
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="gradient-text">YAAM ARINTHA AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label[language]}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'தமிழ்' : 'EN'}
          </button>

          {userProfile ? (
            <Link to="/dashboard" className="profile-btn">
              <User size={18} />
              <span>{userProfile.name}</span>
            </Link>
          ) : (
            <Link to="/onboarding" className="primary-btn sm">
              {language === 'en' ? 'Start Learning' : 'கற்க தொடங்கு'}
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label[language]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
