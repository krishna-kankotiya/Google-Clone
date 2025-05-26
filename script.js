function feelingLucky() {
  const query = document.querySelector('.search-input').value;
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI`;
  }
}
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Voice search with pulse
const voiceBtn = document.getElementById('voiceSearch');
const searchInput = document.getElementById('searchInput');

voiceBtn.addEventListener('click', () => {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    voiceBtn.classList.add('listening');

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      voiceBtn.classList.remove('listening');

      // Optional: Automatically submit form after voice input
      document.querySelector('form').submit();
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      alert('Voice recognition error. Please try again.');
      voiceBtn.classList.remove('listening');
    };

    recognition.onend = () => {
      voiceBtn.classList.remove('listening');
    };
  } else {
    alert('Sorry, your browser does not support voice recognition. Try using Google Chrome.');
  }
});

// Translations
const translations = {
  en: { searchPlaceholder: "Search Google", searchBtn: "Search the Web", luckyBtn: "Discover Something New", googlyText: "Today’s Googly: Are you taller when you wake up in the morning?", country: "India" },
  hi: { searchPlaceholder: "Google खोजें", searchBtn: "Google खोजें", luckyBtn: "मैं भाग्यशाली हूँ", googlyText: "आज का गूगली: क्या आप सुबह उठने पर लम्बे होते हैं?", country: "भारत" },
  gu: { searchPlaceholder: "Google શોધો", searchBtn: "Google શોધ", luckyBtn: "હું ભાગ્યશાળી", googlyText: "આજનું Googlie: તમે સવારે ઊઠતા ઊંચા છો?", country: "ભારત" },
  bn: { searchPlaceholder: "Google অনুসন্ধান", searchBtn: "Google অনুসন্ধান", luckyBtn: "আমি ভাগ্যবান", googlyText: "আজকের Googlie: আপনি কি সকালে লম্বা হন?", country: "ভারত" },
  ta: { searchPlaceholder: "Google தேடு", searchBtn: "Google தேடு", luckyBtn: "நான் அதிர்ஷ்டசாலி", googlyText: "இன்றைய Googlie: காலை எழுந்ததும் நீளமாகிறீர்களா?", country: "இந்தியா" },
  kn: { searchPlaceholder: "Google ಹುಡುಕಿ", searchBtn: "Google ಹುಡುಕಿ", luckyBtn: "ನಾನು ಅದೃಷ್ಟಶಾಲಿ", googlyText: "ಇಂದು Googlie: ನೀವು ಬೆಳಿಗ್ಗೆ ಎದ್ದು ಎತ್ತರವಾಗುತ್ತೀರಾ?", country: "ಭಾರತ" },
  ml: { searchPlaceholder: "Google തിരയുക", searchBtn: "Google തിരയുക", luckyBtn: "ഞാൻ ഭാഗ്യവാൻ", googlyText: "ഇന്നത്തെ Googlie: രാവിലെ നീളം കൂടുന്നുണ്ടോ?", country: "ഭാരതം" },
  pa: { searchPlaceholder: "Google ਖੋਜੋ", searchBtn: "Google ਖੋਜੋ", luckyBtn: "ਮੈਂ ਖੁਸ਼ਕਿਸਮਤ", googlyText: "ਅੱਜ ਦੀ Googlie: ਸਵੇਰੇ ਉੱਠਦੇ ਹੋਏ ਲੰਬੇ ਹੋ ਜਾਂਦੇ ਹੋ?", country: "ਭਾਰਤ" }
};

document.querySelectorAll('.languages a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const lang = link.getAttribute('data-lang');
    const t = translations[lang] || translations.en;
    searchInput.placeholder = t.searchPlaceholder;
    document.getElementById('searchBtn').textContent = t.searchBtn;
    document.getElementById('luckyBtn').textContent = t.luckyBtn;
    document.getElementById('googlyText').textContent = t.googlyText;
    document.getElementById('country').textContent = t.country;
  });
});