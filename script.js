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
    let apiUrl = '';

    if (currentLanguage === 'english') {
      apiUrl = 'https://random-hadith-generator.vercel.app/bukhari/';
    } else {
      const randomHadithNumber = Math.floor(Math.random() * 5100) + 1;
      apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/urd-abudawud/${randomHadithNumber}.min.json`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    let hadithText = '';

    if (currentLanguage === 'english') {
      hadithText = data.data.hadith_english;
      narratorElement.innerText = data.data.header;
    } else {
      hadithText = data.hadiths[0].text; // Extracting text from the first Hadith object
    }

    hadithElement.innerText = hadithText;
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
