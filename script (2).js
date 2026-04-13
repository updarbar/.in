// =============================================
// SHARED UTILITY SCRIPT
// =============================================

// Toast notifications
function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3500);
}

// Format Indian currency
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Modal helpers
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Confirm dialog
function confirmAction(msg) {
  return window.confirm(msg);
}

// Date helpers
function getTodayDateStr() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function getDateStr(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function getTimeStr() {
  return new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', hour12:true});
}

// Number analysis
function analyzeNumbers(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');
  const nums = lines.map(l => parseInt(l)).filter(n => !isNaN(n) && n >= 0 && n <= 99);

  if (nums.length === 0) return null;

  const total = nums.reduce((a, b) => a + b, 0);
  const avg = (total / nums.length).toFixed(2);
  const count = nums.length;
  const lastDigits = nums.map(n => n % 10);
  const digitFreq = {};
  lastDigits.forEach(d => { digitFreq[d] = (digitFreq[d] || 0) + 1; });
  const topDigit = Object.entries(digitFreq).sort((a,b) => b[1]-a[1])[0];
  
  // Simple suggestion: based on pattern
  const lastNum = nums[nums.length - 1];
  const suggested = (lastNum + Math.round(avg) % 10) % 100;

  return { total, avg, count, nums, topDigit: topDigit[0], suggested };
}

// Commission calculation
function calcCommission(amount, rate = 10) {
  const commission = amount * (rate / 100);
  const userAmount = amount * ((100 - rate) / 100);
  return { commission: commission.toFixed(2), userAmount: userAmount.toFixed(2) };
}

// Export to CSV
function exportCSV(data, filename) {
  if (!data.length) return showToast('No data to export', 'error');
  const headers = Object.keys(data[0]);
  const rows = data.map(r => headers.map(h => `"${r[h] || ''}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported successfully!', 'success');
}

// Sidebar toggle
function toggleSidebar() {
  const sb = document.querySelector('.sidebar');
  if (sb) sb.classList.toggle('open');
}

// Password generator
function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({length:8}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
}

// Number words (same as firebase.js)
const NUM_WORDS = {
  0:'Zero',1:'Ek',2:'Do',3:'Teen',4:'Char',5:'Paanch',6:'Chhe',7:'Saat',8:'Aath',9:'Nau',10:'Das',
  11:'Gyarah',12:'Barah',13:'Terah',14:'Chaudah',15:'Pandrah',16:'Solah',17:'Satrah',18:'Atharah',
  19:'Unnis',20:'Bees',21:'Ikkis',22:'Bais',23:'Teis',24:'Chaubis',25:'Pachis',26:'Chhabis',
  27:'Sattais',28:'Atthais',29:'Untis',30:'Tees',31:'Ikatees',32:'Battees',33:'Tentees',
  34:'Chautees',35:'Paintees',36:'Chhattees',37:'Saintees',38:'Adatees',39:'Untaalis',40:'Chalis',
  41:'Ikatalis',42:'Byalis',43:'Tentalis',44:'Chavalis',45:'Paintalis',46:'Chhiyalis',
  47:'Saintalis',48:'Adtalis',49:'Unnchas',50:'Pachas',51:'Ikkyavan',52:'Bavan',53:'Tirpan',
  54:'Chauvan',55:'Pachpan',56:'Chhappan',57:'Sattavan',58:'Athavan',59:'Unsath',60:'Saath',
  61:'Iksath',62:'Basath',63:'Tirsath',64:'Chausath',65:'Painsath',66:'Chhiyasath',
  67:'Sarsath',68:'Adsath',69:'Unhattar',70:'Sattar',71:'Ikahattar',72:'Bahattar',
  73:'Tihattar',74:'Chauhattar',75:'Pachhattar',76:'Chhihattar',77:'Sathattar',
  78:'Athhattar',79:'Unasi',80:'Assi',81:'Ikyasi',82:'Bayasi',83:'Tirasi',84:'Chaurasi',
  85:'Pachasi',86:'Chhiyasi',87:'Satasi',88:'Athasi',89:'Nabbay',90:'Nabbe',
  91:'Ikyanabbe',92:'Banabbe',93:'Tiranabbe',94:'Chaunabbe',95:'Pachanabbe',
  96:'Chhiyanabbe',97:'Satanabbe',98:'Athanabbe',99:'Ninyanabbe'
};

function getWord(n) { return NUM_WORDS[parseInt(n)] || n.toString(); }
