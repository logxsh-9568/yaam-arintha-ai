import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('yaam_userProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('yaam_language') || 'en';
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('yaam_progress');
    return saved ? JSON.parse(saved) : {
      completedPoems: [],
      quizScores: [],
      debateScores: [],
      missionsCompleted: [],
      badges: [],
      learningStreak: 1
    };
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('yaam_userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('yaam_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('yaam_progress', JSON.stringify(progress));
  }, [progress]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const updateProgress = (key, data) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (Array.isArray(newProgress[key]) && !newProgress[key].includes(data)) {
        newProgress[key].push(data);
      }
      return newProgress;
    });
  };

  return (
    <AppContext.Provider value={{
      userProfile,
      setUserProfile,
      language,
      toggleLanguage,
      progress,
      updateProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};
