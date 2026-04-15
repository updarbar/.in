// =============================================
// UP DARBAR — SHARED COMMON.JS
// All pages include this AFTER Firebase SDKs
// =============================================

// ---- FIREBASE CONFIG ----
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBklYTB9FOP13g-jKSUR7OSaRT4RLazw_Y",
  authDomain: "satta-28662.firebaseapp.com",
  projectId: "satta-28662",
  storageBucket: "satta-28662.firebasestorage.app",
  messagingSenderId: "930874157007",
  appId: "1:930874157007:web:f48410bce16c0f522e54ba"
};

// Initialize only once
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const DB = firebase.firestore();

// Enable offline persistence (data survives page refresh)
// This is wrapped safely — errors are expected in multi-tab scenarios
DB.enablePersistence({ synchronizeTabs: true })
  .then(() => console.log('✅ Firestore persistence enabled'))
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.warn('⚠️ Persistence disabled: multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('⚠️ Persistence not supported in this browser');
    }
  });

// ---- NUMBER WORDS (Hindi/Hinglish) ----
const NUM_WORDS = {
  0:'Zero',1:'Ek',2:'Do',3:'Teen',4:'Char',5:'Paanch',6:'Chhe',7:'Saat',
  8:'Aath',9:'Nau',10:'Das',11:'Gyarah',12:'Barah',13:'Terah',14:'Chaudah',
  15:'Pandrah',16:'Solah',17:'Satrah',18:'Atharah',19:'Unnis',20:'Bees',
  21:'Ikkis',22:'Bais',23:'Teis',24:'Chaubis',25:'Pachis',26:'Chhabis',
  27:'Sattais',28:'Atthais',29:'Untis',30:'Tees',31:'Ikatees',32:'Battees',
  33:'Tentees',34:'Chautees',35:'Paintees',36:'Chhattees',37:'Saintees',
  38:'Adatees',39:'Untaalis',40:'Chalis',41:'Ikatalis',42:'Byalis',
  43:'Tentalis',44:'Chavalis',45:'Paintalis',46:'Chhiyalis',47:'Saintalis',
  48:'Adtalis',49:'Unnchas',50:'Pachas',51:'Ikkyavan',52:'Bavan',53:'Tirpan',
  54:'Chauvan',55:'Pachpan',56:'Chhappan',57:'Sattavan',58:'Athavan',
  59:'Unsath',60:'Saath',61:'Iksath',62:'Basath',63:'Tirsath',64:'Chausath',
  65:'Painsath',66:'Chhiyasath',67:'Sarsath',68:'Adsath',69:'Unhattar',
  70:'Sattar',71:'Ikahattar',72:'Bahattar',73:'Tihattar',74:'Chauhattar',
  75:'Pachhattar',76:'Chhihattar',77:'Sathattar',78:'Athhattar',79:'Unasi',
  80:'Assi',81:'Ikyasi',82:'Bayasi',83:'Tirasi',84:'Chaurasi',85:'Pachasi',
  86:'Chhiyasi',87:'Satasi',88:'Athasi',89:'Nabbay',90:'Nabbe',91:'Ikyanabbe',
  92:'Banabbe',93:'Tiranabbe',94:'Chaunabbe',95:'Pachanabbe',96:'Chhiyanabbe',
  97:'Satanabbe',98:'Athanabbe',99:'Ninyanabbe'
};

function gW(n) { return NUM_WORDS[parseInt(n)] || String(n); }

// ---- DATE / TIME (IST) ----
function getNowIST() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
}
function getTodayStr() {
  const d = getNowIST();
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}
function getTimeStr() {
  const now = getNowIST();
  return now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true, timeZone:'Asia/Kolkata' });
}
function parseTimeToDate(ts) {
  const base = getNowIST();
  if (!ts) { base.setHours(18, 0, 0, 0); return base; }
  try {
    const t = ts.toUpperCase().trim();
    let h = 18, m = 0;
    if (t.includes('PM') || t.includes('AM')) {
      const parts = t.split(' ');
      const hm = parts[0].split(':');
      h = parseInt(hm[0]); m = parseInt(hm[1] || 0);
      if (parts[1] === 'PM' && h < 12) h += 12;
      if (parts[1] === 'AM' && h === 12) h = 0;
    } else {
      const hm = t.split(':');
      h = parseInt(hm[0]); m = parseInt(hm[1] || 0);
    }
    base.setHours(h, m, 0, 0);
  } catch(e) { base.setHours(18, 0, 0, 0); }
  return base;
}
function fmtTimeStr(ts) {
  if (!ts) return '6:00 PM';
  const u = ts.toUpperCase();
  if (u.includes('AM') || u.includes('PM')) return ts;
  const parts = ts.split(':');
  let h = parseInt(parts[0]);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${parts[1]} ${ap}`;
}
function fmtINR(n) { return '₹' + Number(n || 0).toLocaleString('en-IN'); }

// ---- TOAST ----
function toast(msg, type = 'i') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3800);
}

// ---- MODAL ----
function openModal(id) { const el = document.getElementById(id); if(el) el.style.display = 'flex'; }
function closeModal(id) { const el = document.getElementById(id); if(el) el.style.display = 'none'; }

// ---- SIDEBAR ----
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

// ---- PASSWORD GENERATOR ----
function genPwd() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#';
  return Array.from({ length: 8 }, () => c[Math.floor(Math.random() * c.length)]).join('');
}

// ---- CSV EXPORT ----
function exportCSV(data, filename) {
  if (!data || !data.length) { toast('No data to export', 'e'); return; }
  const headers = Object.keys(data[0]);
  const rows = data.map(r => headers.map(h => `"${(r[h] !== null && r[h] !== undefined ? r[h] : '').toString().replace(/"/g, "'")}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = filename + '_' + getTodayStr() + '.csv';
  a.click();
  toast('Exported!', 's');
}

// ---- PWA INSTALL ----
let _deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredPrompt = e;
  document.querySelectorAll('.install-banner').forEach(b => b.classList.add('show'));
});
window.addEventListener('appinstalled', () => {
  _deferredPrompt = null;
  document.querySelectorAll('.install-banner').forEach(b => b.classList.remove('show'));
});
function installPWA() {
  if (_deferredPrompt) {
    _deferredPrompt.prompt();
    _deferredPrompt.userChoice.then(() => {
      _deferredPrompt = null;
      document.querySelectorAll('.install-banner').forEach(b => b.classList.remove('show'));
    });
  } else {
    alert('📲 App Install Steps:\n\n📱 Android Chrome:\n  Menu (⋮) → "Add to Home Screen"\n\n🍎 iOS Safari:\n  Share button (□↑) → "Add to Home Screen"\n\n💻 Desktop Chrome:\n  Address bar → Install icon (⊕)');
  }
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(e => console.log('SW:', e));
}

console.log('✅ UP Darbar common.js loaded. DB ready:', !!DB);
