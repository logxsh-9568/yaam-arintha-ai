export const aiResponses = {
  default: {
    ta: "மன்னிக்கவும், எனக்கு சரியாக புரியவில்லை. பாரதியார், அவரது பாடல்கள் அல்லது அவரது கருத்துக்கள் பற்றி கேளுங்கள்.",
    en: "I'm sorry, I didn't quite catch that. Please ask me about Bharathiyar, his poems, or his vision."
  },
  keywords: [
    {
      keys: ["அச்சமில்லை", "பயம்", "achamillai", "fear", "courage", "பயப்பட"],
      response: {
        ta: "'அச்சமில்லை அச்சமில்லை' என்ற பாடல், நாம் எந்த சூழ்நிலையிலும் பயப்படாமல் இருக்க வேண்டும் என்பதை வலியுறுத்துகிறது. உலகமே நம்மை எதிர்த்தாலும் தைரியமாக நிற்க வேண்டும் என்பதே பாரதியின் கருத்து.",
        en: "The poem 'Achamillai Achamillai' emphasizes that we should never be afraid, no matter the situation. Bharathiyar's vision is that we must stand bravely even if the whole world is against us."
      }
    },
    {
      keys: ["பெண்கள்", "விடுதலை", "women", "empowerment", "equality", "பெண்"],
      response: {
        ta: "பாரதியார் பெண்கள் முன்னேற்றத்திற்கு பெரும் குரல் கொடுத்தவர். 'பட்டங்கள் ஆள்வதும் சட்டங்கள் செய்வதும் பாரினில் பெண்கள் நடத்த வந்தோம்' என்று கூறி, பெண்கள் அனைத்து துறைகளிலும் சமமாக ஈடுபட வேண்டும் என்றார்.",
        en: "Bharathiyar was a great champion of women's empowerment. He declared that women have come to rule and make laws, advocating for their equal participation in all fields."
      }
    },
    {
      keys: ["கல்வி", "படிப்பு", "education", "study", "குழந்தை", "children"],
      response: {
        ta: "கல்வியின் முக்கியத்துவத்தை பாரதியார் ஆழமாக உணர்த்தினார். 'ஓடி விளையாடு பாப்பா' என்று குழந்தைகளின் உடல் நலனை மட்டுமல்லாமல், சுறுசுறுப்பாக கற்கவும் வலியுறுத்தினார்.",
        en: "Bharathiyar deeply emphasized the importance of education. By saying 'Odi Vilayadu Pappa', he stressed not only physical health for children but also an active, curious mind for learning."
      }
    },
    {
      keys: ["சுதந்திரம்", "நாடு", "freedom", "nation", "patriotism", "சுதந்திர"],
      response: {
        ta: "பாரதியாரின் பாடல்கள் சுதந்திரப் போராட்டத்தில் பெரும் தாக்கத்தை ஏற்படுத்தின. அவரது கவிதைகள் மக்களிடம் நாட்டுப்பற்றையும் சுதந்திர தாகத்தையும் வளர்த்தன.",
        en: "Bharathiyar's songs had a massive impact on the Indian independence movement. His poems cultivated patriotism and a deep thirst for freedom among the people."
      }
    },
    {
      keys: ["meaning", "கருத்து", "விளக்கு", "explain", "theme"],
      response: {
        ta: "இந்த பாடலின் முக்கிய கருத்து, மனித குலம் அச்சத்தை வென்று, சமத்துவத்தோடும் சுதந்திரத்தோடும் வாழ வேண்டும் என்பதே ஆகும்.",
        en: "The main theme of this poem is that humanity must overcome fear and live with equality and freedom."
      }
    }
  ]
};

export const getSmartResponse = (query, lang = 'en') => {
  const lowerQuery = query.toLowerCase();
  
  for (const item of aiResponses.keywords) {
    if (item.keys.some(key => lowerQuery.includes(key))) {
      return item.response[lang];
    }
  }
  
  return aiResponses.default[lang];
};
