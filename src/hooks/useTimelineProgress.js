import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bharathiTimelineProgress';

export const useTimelineProgress = (totalYears) => {
  const [progress, setProgress] = useState({
    completedYears: [],
    lastVisitedYear: null,
    journeyCompleted: false,
    badges: []
  });

  const [toast, setToast] = useState(null);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProgress(JSON.parse(stored));
    }
  }, []);

  // Save to local storage whenever progress changes
  useEffect(() => {
    if (progress.completedYears.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const markYearCompleted = (year) => {
    setProgress(prev => {
      // Don't add if already completed
      if (prev.completedYears.includes(year)) {
        return { ...prev, lastVisitedYear: year };
      }

      const newCompleted = [...prev.completedYears, year];
      let newBadges = [...prev.badges];
      let unlockedMessage = null;

      // Check milestones
      if (newCompleted.length === 1 && !newBadges.includes('FIRST STEP')) {
        newBadges.push('FIRST STEP');
        unlockedMessage = '✦ FIRST STEP milestone unlocked!';
      } else if (newCompleted.length === 3 && !newBadges.includes('TIME TRAVELER')) {
        newBadges.push('TIME TRAVELER');
        unlockedMessage = '✦ TIME TRAVELER milestone unlocked!';
      } else if (newCompleted.length === 5 && !newBadges.includes('BHARATHI SCHOLAR')) {
        newBadges.push('BHARATHI SCHOLAR');
        unlockedMessage = '✦ BHARATHI SCHOLAR milestone unlocked!';
      } else if (newCompleted.length === totalYears && !newBadges.includes('VISION KEEPER')) {
        newBadges.push('VISION KEEPER');
        newBadges.push('MAHAKAVI EXPLORER');
        unlockedMessage = '✦ MAHAKAVI EXPLORER milestone unlocked!';
      }

      if (unlockedMessage) {
        showToast(unlockedMessage);
      }

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
    toast
  };
};
