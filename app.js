// AnimeVault.id — static gallery, no backend required.
// Add images you own/have permission to publish to /images and add entries below.
let wallpapers = [
 {title:"Neon Ronin",category:"Neon",mood:"Electric violet",symbol:"刀",tag:"NEON / 01",bg:"linear-gradient(155deg,#221447,#6938b7 48%,#f45d9b)",colors:["#221447","#f45d9b"],orb:"linear-gradient(135deg,#f7ef78,#ff6db0)",description:"Palet neon ungu dan merah muda dengan nuansa ronin futuristik.",anime:"Original demo",image:null},
 {title:"Dream Shrine",category:"Fantasy",mood:"Dreamy spirit",symbol:"鳥",tag:"FANTASY / 02",bg:"linear-gradient(155deg,#173f55,#42bcb6 55%,#d4f6c8)",colors:["#173f55","#d4f6c8"],orb:"linear-gradient(135deg,#f8f3c7,#f1a8dc)",description:"Suasana lembut yang terinspirasi oleh taman roh dan alam fantasi.",anime:"Original demo",image:null},
 {title:"Crimson Echo",category:"Dark",mood:"Midnight red",symbol:"月",tag:"DARK / 03",bg:"linear-gradient(155deg,#170f26,#712b4b 58%,#ec695f)",colors:["#170f26","#ec695f"],orb:"linear-gradient(135deg,#ffb26b,#f04472)",description:"Palet gelap dengan aksen merah untuk tampilan layar yang dramatis.",anime:"Original demo",image:null},
 {title:"Cloud Runner",category:"Minimal",mood:"Soft blue",symbol:"雲",tag:"MINIMAL / 04",bg:"linear-gradient(155deg,#a6d7f7,#c6b9ff 60%,#ffe4ee)",colors:["#a6d7f7","#ffe4ee"],orb:"linear-gradient(135deg,#ffffff,#8ad9f6)",description:"Komposisi minimal bernuansa langit biru, lavender, dan pastel.",anime:"Original demo",image:null},
 {title:"Solar Samurai",category:"Neon",mood:"Golden energy",symbol:"侍",tag:"NEON / 05",bg:"linear-gradient(155deg,#311e64,#dc5d94 52%,#ffb65c)",colors:["#311e64","#ffb65c"],orb:"linear-gradient(135deg,#fff28b,#ff815e)",description:"Cahaya hangat keemasan berpadu dengan warna neon yang kuat.",anime:"Original demo",image:null},
 {title:"Moon Garden",category:"Fantasy",mood:"Mystic garden",symbol:"花",tag:"FANTASY / 06",bg:"linear-gradient(155deg,#152c4d,#526db1 55%,#d8a6e9)",colors:["#152c4d","#d8a6e9"],orb:"linear-gradient(135deg,#f7f4d4,#92e8d3)",description:"Warna malam, bulan, dan taman magis dengan nuansa dreamy.",anime:"Original demo",image:null},
 {title:"Void Pulse",category:"Dark",mood:"Deep space",symbol:"零",tag:"DARK / 07",bg:"linear-gradient(155deg,#0e1229,#30245e 60%,#7351a8)",colors:["#0e1229","#7351a8"],orb:"linear-gradient(135deg,#a58cff,#fa72c8)",description:"Kontras gelap dengan aksen ungu untuk mood kosmik.",anime:"Original demo",image:null},
 {title:"Peach Horizon",category:"Minimal",mood:"Warm sunset",symbol:"日",tag:"MINIMAL / 08",bg:"linear-gradient(155deg,#ffbca9,#f3a4c8 50%,#b7a5ef)",colors:["#ffbca9","#b7a5ef"],orb:"linear-gradient(135deg,#fff5bd,#ff8a9b)",description:"Warna senja peach dan pink dengan bentuk sederhana.",anime:"Original demo",image:null},
 {title:"Cyber Koi",category:"Neon",mood:"Tokyo night",symbol:"鯉",tag:"NEON / 09",bg:"linear-gradient(155deg,#091c42,#165a92 55%,#f24f9b)",colors:["#091c42","#f24f9b"],orb:"linear-gradient(135deg,#8dffec,#ff6dc5)",description:"Palet cyberpunk biru elektrik dengan aksen neon pink.",anime:"Original demo",image:null},
 {title:"Spirit Bloom",category:"Fantasy",mood:"Enchanted",symbol:"蝶",tag:"FANTASY / 10",bg:"linear-gradient(155deg,#2b245e,#9267b8 52%,#f5a9c8)",colors:["#2b245e","#f5a9c8"],orb:"linear-gradient(135deg,#f5f5a6,#ff91d2)",description:"Nuansa fantasi lembut dengan simbol kupu-kupu dan warna bunga.",anime:"Original demo",image:null},
 {title:"Obsidian",category:"Dark",mood:"Shadow mode",symbol:"黒",tag:"DARK / 11",bg:"linear-gradient(155deg,#10101c,#30344c 55%,#7c3f65)",colors:["#10101c","#7c3f65"],orb:"linear-gradient(135deg,#d5d8e8,#ff8bb4)",description:"Abu gelap dan aksen plum untuk tampilan minimal yang moody.",anime:"Original demo",image:null},
 {title:"Candy Comet",category:"Minimal",mood:"Playful pastel",symbol:"星",tag:"MINIMAL / 12",bg:"linear-gradient(155deg,#f9a8d4,#c4b5fd 50%,#93e9ed)",colors:["#f9a8d4","#93e9ed"],orb:"linear-gradient(135deg,#fff7ad,#ff90c2)",description:"Pastel cerah dengan vibe playful, ringan, dan manis.",anime:"Original demo",image:null}
];
const grid=document.getElementById('galleryGrid'), searchInput=document.getElementById('searchInput'), filters=document.getElementById('filters'), sortSelect=document.getElementById('sortSelect'), emptyState=document.getElementById('emptyState');
const dialog=document.getElementById('detailDialog'); let activeFilter='Semua',toastTimer;
document.getElementById('wallpaperCount').textContent=wallpapers.length;
document.getElementById('allCount').textContent=wallpapers.length;
document.getElementById('year').textContent=new Date().getFullYear();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800);}
function visibleList(){
 const q=searchInput.value.trim().toLocaleLowerCase('id');
 let list=wallpapers.filter(w=>(activeFilter==='Semua'||w.category===activeFilter||(activeFilter==='Anime'&&w.anime!=='Original demo'))&&[w.title,w.category,w.mood,w.tag,w.anime,w.description].some(v=>String(v).toLocaleLowerCase('id').includes(q)));
 if(sortSelect.value==='az')list.sort((a,b)=>a.title.localeCompare(b.title));
 if(sortSelect.value==='za')list.sort((a,b)=>b.title.localeCompare(a.title));
 return list;
}
function cardArt(w,i){
 if(w.image)return `<img class="photo" src="${esc(w.image)}" alt="${esc(w.title)}" loading="lazy">`;
 return `<div class="shape" aria-hidden="true" style="background:${w.orb}"></div><div class="figure" aria-hidden="true">${esc(w.symbol)}</div>`;
}
function render(){
 const list=visibleList();
 grid.innerHTML=list.map(w=>{const i=wallpapers.indexOf(w)+1;return `<article class="wall-card" tabindex="0" role="button" data-detail="${i-1}" aria-label="Lihat detail ${esc(w.title)}">
  <div class="wall-art" style="--art-bg:${w.bg}" aria-label="${esc(w.title)}">${cardArt(w,i)}<span class="vertical-label">ANIMEVAULT / ${w.image?'IMAGE':'DEMO'}</span><span class="index">${String(i).padStart(2,'0')}</span><div class="art-bottom"><small>${esc(w.tag)}</small><strong>${esc(w.title)}</strong></div></div>
  <div class="wall-info"><div><h3>${esc(w.title)}</h3><p>${esc(w.category)} · ${esc(w.mood)}</p></div><button class="download-btn" data-download="${i-1}" aria-label="Unduh ${esc(w.title)}" title="Unduh wallpaper">↓</button></div></article>`}).join('');
 document.getElementById('resultsLabel').textContent=`Menampilkan ${list.length} dari ${wallpapers.length} wallpaper`;
 emptyState.hidden=list.length!==0;grid.hidden=list.length===0;
}
function makeSvg(w){
 const c=w.colors||['#221447','#f45d9b'];
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient><radialGradient id="orb"><stop stop-color="${(w.colors||[])[1]||'#ff6db0'}"/><stop offset="1" stop-color="${c[0]}" stop-opacity=".2"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#bg)"/><circle cx="760" cy="600" r="440" fill="url(#orb)"/><circle cx="760" cy="600" r="340" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><circle cx="760" cy="600" r="260" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/><path d="M-100 1120 L1180 380 M-100 1270 L1180 530 M-100 1420 L1180 680" stroke="#fff" stroke-opacity=".13" stroke-width="4"/><text x="70" y="110" fill="#fff" fill-opacity=".8" font-family="Arial,sans-serif" font-size="26" letter-spacing="10">ANIMEVAULT.ID / ORIGINAL DEMO</text><text x="540" y="980" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-weight="700" font-size="330">${esc(w.symbol)}</text><text x="70" y="1600" fill="#fff" font-family="Arial,sans-serif" font-weight="700" font-size="82">${esc(w.title.toUpperCase())}</text><text x="74" y="1665" fill="#fff" fill-opacity=".8" font-family="Arial,sans-serif" font-size="30" letter-spacing="8">${esc(w.tag)}</text><path d="M72 1720 H1008" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><text x="72" y="1785" fill="#fff" fill-opacity=".8" font-family="Arial,sans-serif" font-size="24">YOUR NEXT PHONE WALLPAPER</text></svg>`;
}
function downloadWallpaper(w){
 if(w.image){const a=document.createElement('a');a.href=w.image;a.download=w.filename||w.image.split('/').pop()||'animevault-wallpaper';document.body.appendChild(a);a.click();a.remove();showToast('Unduhan dimulai. Jika gambar terbuka di tab baru, gunakan menu browser untuk menyimpannya.');return;}
 const blob=new Blob([makeSvg(w)],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=`animevault-${w.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.svg`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);showToast('Wallpaper demo diunduh sebagai SVG 1080 × 1920.');
}
function openDetails(index){
 const w=wallpapers[index];if(!w)return;
 const art=document.getElementById('modalArt');
 art.style.background=w.bg;
 art.innerHTML=w.image?`<img src="${esc(w.image)}" alt="${esc(w.title)}">`:`<div class="modal-symbol">${esc(w.symbol)}</div>`;
 document.getElementById('modalTitle').textContent=w.title;
 document.getElementById('modalDescription').textContent=w.description;
 document.getElementById('modalTags').innerHTML=[w.category,w.mood,w.anime].map(t=>`<span>${esc(t)}</span>`).join('');
 const dl=document.getElementById('modalDownload');
 if(w.image){dl.href=w.image;dl.download=w.filename||w.image.split('/').pop()||'wallpaper';dl.onclick=e=>{e.preventDefault();downloadWallpaper(w)};}
 else {const blob=new Blob([makeSvg(w)],{type:'image/svg+xml;charset=utf-8'});dl.href=URL.createObjectURL(blob);dl.download=`animevault-${w.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.svg`;dl.onclick=null;}
 document.getElementById('modalCopy').onclick=async()=>{const info=`${w.title} — ${w.category} — ${w.mood} — ${w.anime}`;try{await navigator.clipboard.writeText(info);showToast('Info wallpaper disalin.')}catch{showToast(info)}};
 if(!dialog.open)dialog.showModal();
}
filters.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;activeFilter=b.dataset.filter;filters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()});
searchInput.addEventListener('input',render);sortSelect.addEventListener('change',render);
grid.addEventListener('click',e=>{const dl=e.target.closest('[data-download]');if(dl){e.stopPropagation();downloadWallpaper(wallpapers[Number(dl.dataset.download)]);return;}const card=e.target.closest('[data-detail]');if(card)openDetails(Number(card.dataset.detail))});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-detail]')){e.preventDefault();openDetails(Number(e.target.dataset.detail))}});
document.getElementById('closeModal').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>{const dl=document.getElementById('modalDownload');if(dl.href.startsWith('blob:'))URL.revokeObjectURL(dl.href)});
document.getElementById('resetSearch').addEventListener('click',()=>{searchInput.value='';activeFilter='Semua';sortSelect.value='featured';filters.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='Semua'));render()});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();searchInput.focus()}if(e.key==='Escape'&&!dialog.open){searchInput.value='';searchInput.blur();render()}});
async function loadCatalog(){
  // On GitHub Pages, the exported catalog.json overrides the demo collection.
  // file:// previews may block fetch; in that case the built-in collection is used.
  try {
    const response = await fetch('./wallpapers.json', {cache:'no-store'});
    if(response.ok){
      const data = await response.json();
      if(Array.isArray(data) && data.length) wallpapers = data;
    }
  } catch (_) {}
  document.getElementById('wallpaperCount').textContent = wallpapers.length;
  document.getElementById('allCount').textContent = wallpapers.length;
}
loadCatalog().then(render);