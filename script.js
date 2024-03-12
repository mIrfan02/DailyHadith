const hadithElement = document.getElementById('hadis');
const newHadithButton = document.getElementById('newb');
const narratorElement = document.getElementById('narrator');
const soundIcon = document.querySelector('.sound');
const soundOffIcon = document.querySelector('.stop');
const languageSelect = document.getElementById('language');

let speech = null;
let currentLanguage = 'english'; // Default language

function changeLanguage() {
  currentLanguage = languageSelect.value;
  fetchRandomHadith();
}

async function fetchRandomHadith() {
  try {
    newHadithButton.innerText = 'Loading Hadith...';
    const apiUrl = currentLanguage === 'english'
      ? 'https://random-hadith-generator.vercel.app/bukhari/'
      : 'https://hadeethenc.com/api/v1/urdu';

    const response = await fetch(apiUrl);
    const data = await response.json();
    hadithElement.innerText = currentLanguage === 'english'
      ? data.data.hadith_english
      : data.data.hadith_urdu;

    narratorElement.innerText = data.data.header;
    newHadithButton.innerText = 'New Hadith';
  } catch (error) {
    console.error('Error fetching Hadith:', error);
    newHadithButton.innerText = 'Failed to load Hadith';
  }
}

soundIcon.addEventListener('click', () => {
  if (speech === null) {
    speech = new SpeechSynthesisUtterance(hadithElement.innerText);
    speech.onend = () => {
      speech = null;
    };
    speechSynthesis.speak(speech);
  }
});

soundOffIcon.addEventListener('click', () => {
  if (speech !== null) {
    speechSynthesis.cancel();
  }
});

newHadithButton.addEventListener('click', fetchRandomHadith);

// Add language selection event listener
languageSelect.addEventListener('change', changeLanguage);




// Additional styles for your existing CSS remain unchanged
