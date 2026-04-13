// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBklYTB9FOP13g-jKSUR7OSaRT4RLazw_Y",
  authDomain: "satta-28662.firebaseapp.com",
  projectId: "satta-28662",
  storageBucket: "satta-28662.firebasestorage.app",
  messagingSenderId: "930874157007",
  appId: "1:930874157007:web:f48410bce16c0f522e54ba",
  measurementId: "G-X2599ZJZ1Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Number to words (Hindi/Hinglish for common Satta numbers)
const numberWords = {
  0: 'Zero', 1: 'Ek', 2: 'Do', 3: 'Teen', 4: 'Char', 5: 'Paanch',
  6: 'Chhe', 7: 'Saat', 8: 'Aath', 9: 'Nau', 10: 'Das',
  11: 'Gyarah', 12: 'Barah', 13: 'Terah', 14: 'Chaudah', 15: 'Pandrah',
  16: 'Solah', 17: 'Satrah', 18: 'Atharah', 19: 'Unnis', 20: 'Bees',
  21: 'Ikkis', 22: 'Bais', 23: 'Teis', 24: 'Chaubis', 25: 'Pachis',
  26: 'Chhabis', 27: 'Sattais', 28: 'Atthais', 29: 'Untis', 30: 'Tees',
  31: 'Ikatees', 32: 'Battees', 33: 'Tentees', 34: 'Chautees', 35: 'Paintees',
  36: 'Chhattees', 37: 'Saintees', 38: 'Adatees', 39: 'Untaalis', 40: 'Chalis',
  41: 'Ikatalis', 42: 'Byalis', 43: 'Tentalis', 44: 'Chavalis', 45: 'Paintalis',
  46: 'Chhiyalis', 47: 'Saintalis', 48: 'Adtalis', 49: 'Unnchas', 50: 'Pachas',
  51: 'Ikkyavan', 52: 'Bavan', 53: 'Tirpan', 54: 'Chauvan', 55: 'Pachpan',
  56: 'Chhappan', 57: 'Sattavan', 58: 'Athavan', 59: 'Unsath', 60: 'Saath',
  61: 'Iksath', 62: 'Basath', 63: 'Tirsath', 64: 'Chausath', 65: 'Painsath',
  66: 'Chhiyasath', 67: 'Sarsath', 68: 'Adsath', 69: 'Unhattar', 70: 'Sattar',
  71: 'Ikahattar', 72: 'Bahattar', 73: 'Tihattar', 74: 'Chauhattar', 75: 'Pachhattar',
  76: 'Chhihattar', 77: 'Sathattar', 78: 'Athhattar', 79: 'Unasi', 80: 'Assi',
  81: 'Ikyasi', 82: 'Bayasi', 83: 'Tirasi', 84: 'Chaurasi', 85: 'Pachasi',
  86: 'Chhiyasi', 87: 'Satasi', 88: 'Athasi', 89: 'Nabbay', 90: 'Nabbe',
  91: 'Ikyanabbe', 92: 'Banabbe', 93: 'Tiranabbe', 94: 'Chaunabbe', 95: 'Pachanabbe',
  96: 'Chhiyanabbe', 97: 'Satanabbe', 98: 'Athanabbe', 99: 'Ninyanabbe'
};

function getNumberWord(num) {
  return numberWords[num] || num.toString();
}

function getTodayDate() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', hour12:true});
}
