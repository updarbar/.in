
// ============================================
// UP DARBAR — SHARED COMMON.JS v5
// ============================================
const _FC = {
  apiKey: "AIzaSyBklYTB9FOP13g-jKSUR7OSaRT4RLazw_Y",
  authDomain: "satta-28662.firebaseapp.com",
  projectId: "satta-28662",
  storageBucket: "satta-28662.firebasestorage.app",
  messagingSenderId: "930874157007",
  appId: "1:930874157007:web:f48410bce16c0f522e54ba"
};
if (!firebase.apps.length) firebase.initializeApp(_FC);
const DB = firebase.firestore();
DB.enablePersistence({ synchronizeTabs: true }).catch(() => {});

const NW = {
  0:'Zero',1:'Ek',2:'Do',3:'Teen',4:'Char',5:'Paanch',6:'Chhe',7:'Saat',8:'Aath',9:'Nau',
  10:'Das',11:'Gyarah',12:'Barah',13:'Terah',14:'Chaudah',15:'Pandrah',16:'Solah',17:'Satrah',
  18:'Atharah',19:'Unnis',20:'Bees',21:'Ikkis',22:'Bais',23:'Teis',24:'Chaubis',25:'Pachis',
  26:'Chhabis',27:'Sattais',28:'Atthais',29:'Untis',30:'Tees',31:'Ikatees',32:'Battees',
  33:'Tentees',34:'Chautees',35:'Paintees',36:'Chhattees',37:'Saintees',38:'Adatees',
  39:'Untaalis',40:'Chalis',41:'Ikatalis',42:'Byalis',43:'Tentalis',44:'Chavalis',45:'Paintalis',
  46:'Chhiyalis',47:'Saintalis',48:'Adtalis',49:'Unnchas',50:'Pachas',51:'Ikkyavan',52:'Bavan',
  53:'Tirpan',54:'Chauvan',55:'Pachpan',56:'Chhappan',57:'Sattavan',58:'Athavan',59:'Unsath',
  60:'Saath',61:'Iksath',62:'Basath',63:'Tirsath',64:'Chausath',65:'Painsath',66:'Chhiyasath',
  67:'Sarsath',68:'Adsath',69:'Unhattar',70:'Sattar',71:'Ikahattar',72:'Bahattar',73:'Tihattar',
  74:'Chauhattar',75:'Pachhattar',76:'Chhihattar',77:'Sathattar',78:'Athhattar',79:'Unasi',
  80:'Assi',81:'Ikyasi',82:'Bayasi',83:'Tirasi',84:'Chaurasi',85:'Pachasi',86:'Chhiyasi',
  87:'Satasi',88:'Athasi',89:'Nabbay',90:'Nabbe',91:'Ikyanabbe',92:'Banabbe',93:'Tiranabbe',
  94:'Chaunabbe',95:'Pachanabbe',96:'Chhiyanabbe',97:'Satanabbe',98:'Athanabbe',99:'Ninyanabbe'
};
const HW = { 0:'Zero',1:'Ek',2:'Do',3:'Teen',4:'Char',5:'Paanch',6:'Chhe',7:'Saat',8:'Aath',9:'Nau' };

function gW(n) { return NW[parseInt(n)] || String(n); }
function gHW(h) { return (HW[parseInt(h)] || String(h)) + ' Harup'; }

function getNow() { return new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"})); }
function getToday() { const d=getNow(); return `${p2(d.getDate())}-${p2(d.getMonth()+1)}-${d.getFullYear()}`; }
function getTS() { return getNow().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true}); }
function p2(n) { return String(n).padStart(2,'0'); }
function fmtINR(n) { return '₹'+Number(n||0).toLocaleString('en-IN'); }

function parseT(ts) {
  const b=getNow(); if(!ts){b.setHours(18,0,0,0);return b;}
  try {
    const t=ts.toUpperCase().trim(); let h=18,m=0;
    if(t.includes('PM')||t.includes('AM')){
      const[tp,mod]=t.split(' ');const[hh,mm]=tp.split(':');
      h=parseInt(hh);m=parseInt(mm||0);
      if(mod==='PM'&&h<12)h+=12;if(mod==='AM'&&h===12)h=0;
    } else {const[hh,mm]=t.split(':');h=parseInt(hh);m=parseInt(mm||0);}
    b.setHours(h,m,0,0);
  } catch(e){b.setHours(18,0,0,0);}
  return b;
}

function fmtT(ts) {
  if(!ts)return'6:00 PM';const u=ts.toUpperCase();
  if(u.includes('AM')||u.includes('PM'))return ts;
  const[h,m]=ts.split(':');let hr=parseInt(h);
  const ap=hr>=12?'PM':'AM';hr=hr%12||12;return`${hr}:${m} ${ap}`;
}

function sortBets(arr) {
  return arr.sort((a,b) => {
    const ta = a.timestamp?.toMillis?.() || (a.timestamp?.seconds?a.timestamp.seconds*1000:0);
    const tb = b.timestamp?.toMillis?.() || (b.timestamp?.seconds?b.timestamp.seconds*1000:0);
    return tb - ta;
  });
}

function toast(msg, t='i') {
  let w=document.getElementById('twrap');
  if(!w){w=document.createElement('div');w.id='twrap';w.className='twrap';document.body.appendChild(w);}
  const el=document.createElement('div');el.className=`toast t${t}`;el.textContent=msg;w.appendChild(el);
  setTimeout(()=>el.remove(),3800);
}

function openM(id){const e=document.getElementById(id);if(e)e.style.display='flex';}
function closeM(id){const e=document.getElementById(id);if(e)e.style.display='none';}
function toggleSidebar(){const s=document.getElementById('sidebar');if(s)s.classList.toggle('open');}
function genPwd(){const c='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#';return Array.from({length:8},()=>c[Math.floor(Math.random()*c.length)]).join('');}

function exportCSV(data,fn){
  if(!data?.length){toast('No data','e');return;}
  const h=Object.keys(data[0]);
  const csv=[h.join(','),...data.map(r=>h.map(k=>`"${(r[k]??'').toString().replace(/"/g,"'")}"`).join(','))].join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download=fn+'_'+getToday()+'.csv';a.click();toast('Exported!','s');
}

let _dp=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();_dp=e;
  document.querySelectorAll('.install-banner').forEach(b=>b.classList.add('show'));
});
window.addEventListener('appinstalled',()=>{
  _dp=null;
  document.querySelectorAll('.install-banner').forEach(b=>b.classList.remove('show'));
});
function installPWA(){
  if(_dp){_dp.prompt();_dp.userChoice.then(()=>{_dp=null;document.querySelectorAll('.install-banner').forEach(b=>b.classList.remove('show'));});}
  else alert('📲 App Install:\n\n📱 Android Chrome:\nMenu (⋮) → "Add to Home Screen"\n\n🍎 iOS Safari:\nShare (□↑) → "Add to Home Screen"\n\n💻 Desktop Chrome:\nAddress bar mein ⊕ icon');
}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});

console.log('✅ common.js v5 | DB:', !!DB);
