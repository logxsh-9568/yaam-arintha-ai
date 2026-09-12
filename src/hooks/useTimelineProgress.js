import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bharathiTimelineProgress';
const LANG_KEY = 'bharathi-language';
const AUTO_VOICE_KEY = 'bharathi-auto-voice';

export const useTimelineProgress = (totalYears) => {
  const [progress, setProgress] = useState({
    completedYears: [],
    lastVisitedYear: null,
    journeyCompleted: false,
    badges: []
  });

  const [language, setLanguage] = useState('ta');
  const [autoVoice, setAutoVoice] = useState(true);
  const [toast, setToast] = useState(null);

  // Load from local storage
  useEffect(() => {
    const storedProgress = localStorage.getItem(STORAGE_KEY);
    if (storedProgress) setProgress(JSON.parse(storedProgress));

    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang) setLanguage(storedLang);

    const storedAuto = localStorage.getItem(AUTO_VOICE_KEY);
    if (storedAuto !== null) setAutoVoice(storedAuto === 'true');
  }, []);

  // Save progress
  useEffect(() => {
    if (progress.completedYears.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(AUTO_VOICE_KEY, autoVoice);
  }, [autoVoice]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const markYearCompleted = (year) => {
    setProgress(prev => {
      if (prev.completedYears.includes(year)) {
        return { ...prev, lastVisitedYear: year };
      }

      const newCompleted = [...prev.completedYears, year];
      let newBadges = [...prev.badges];
      let unlockedMessage = null;

      if (newCompleted.length === 1 && !newBadges.includes('FIRST STEP')) {
        newBadges.push('FIRST STEP');
        unlockedMessage = language === 'ta' ? '✦ முதல் படி - சின்னம் திறக்கப்பட்டது!' : '✦ FIRST STEP milestone unlocked!';
      } else if (newCompleted.length === 3 && !newBadges.includes('TIME TRAVELER')) {
        newBadges.push('TIME TRAVELER');
        unlockedMessage = language === 'ta' ? '✦ காலப் பயணி - சின்னம் திறக்கப்பட்டது!' : '✦ TIME TRAVELER milestone unlocked!';
      } else if (newCompleted.length === totalYears && !newBadges.includes('MAHAKAVI EXPLORER')) {
        newBadges.push('MAHAKAVI EXPLORER');
        unlockedMessage = language === 'ta' ? '✦ மகாகவி ஆய்வாளர் - சின்னம் திறக்கப்பட்டது!' : '✦ MAHAKAVI EXPLORER milestone unlocked!';
      }

      if (unlockedMessage) showToast(unlockedMessage);

      return {
        completedYears: newCompleted,
        lastVisitedYear: year,
        journeyCompleted: newCompleted.length === totalYears,
        badges: newBadges
      };
    });
  };

  return {
    progress,
    markYearCompleted,
    language,
    setLanguage,
    autoVoice,
    setAutoVoice,
    toast
  };
};
