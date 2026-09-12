export const isVoiceAvailable = () => {
  return 'speechSynthesis' in window;
};

export const getAvailableVoices = () => {
  if (!isVoiceAvailable()) return [];
  return window.speechSynthesis.getVoices();
};

const getVoiceForLanguage = (language) => {
  const voices = getAvailableVoices();
  let selectedVoice = null;

  if (language === 'ta') {
    // Try to find a Tamil Indian voice
    selectedVoice = voices.find(v => v.lang.startsWith('ta-IN') || v.lang.startsWith('ta'));
  } else if (language === 'en') {
    // Try to find an English Indian voice
    selectedVoice = voices.find(v => v.lang.startsWith('en-IN') || v.name.includes('India'));
  }

  // Fallback to first available voice if specific one isn't found
  if (!selectedVoice && voices.length > 0) {
    selectedVoice = voices.find(v => v.lang.startsWith(language)) || voices[0];
  }

  return selectedVoice;
};

export const speakBharathi = (text, language, onStart, onEnd) => {
  if (!isVoiceAvailable()) return false;
  
  stopBharathiVoice();
  
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getVoiceForLanguage(language);
  
  if (voice) {
    utterance.voice = voice;
  }
  
  utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
  utterance.rate = language === 'ta' ? 0.9 : 1.0;
  utterance.pitch = 1.0;
  
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopBharathiVoice = () => {
  if (isVoiceAvailable()) {
    window.speechSynthesis.cancel();
  }
};

export const pauseBharathiVoice = () => {
  if (isVoiceAvailable() && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
};

export const resumeBharathiVoice = () => {
  if (isVoiceAvailable() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
};
