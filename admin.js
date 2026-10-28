const KEY='animevault-admin-catalog-v1';
const defaultCatalog=[
 {title:"Neon Ronin",category:"Neon",mood:"Electric violet",symbol:"刀",tag:"NEON / 01",bg:"linear-gradient(155deg,#221447,#f45d9b)",colors:["#221447","#f45d9b"],orb:"linear-gradient(135deg,#f7ef78,#ff6db0)",description:"Palet neon ungu dan merah muda dengan nuansa ronin futuristik.",anime:"Original demo",image:null},
 {title:"Dream Shrine",category:"Fantasy",mood:"Dreamy spirit",symbol:"鳥",tag:"FANTASY / 02",bg:"linear-gradient(155deg,#173f55,#d4f6c8)",colors:["#173f55","#d4f6c8"],orb:"linear-gradient(135deg,#f8f3c7,#f1a8dc)",description:"Suasana lembut yang terinspirasi oleh taman roh dan alam fantasi.",anime:"Original demo",image:null},
 {title:"Crimson Echo",category:"Dark",mood:"Midnight red",symbol:"月",tag:"DARK / 03",bg:"linear-gradient(155deg,#170f26,#ec695f)",colors:["#170f26","#ec695f"],orb:"linear-gradient(135deg,#ffb26b,#f04472)",description:"Palet gelap dengan aksen merah.",anime:"Original demo",image:null},
 {title:"Cloud Runner",category:"Minimal",mood:"Soft blue",symbol:"雲",tag:"MINIMAL / 04",bg:"linear-gradient(155deg,#a6d7f7,#ffe4ee)",colors:["#a6d7f7","#ffe4ee"],orb:"linear-gradient(135deg,#ffffff,#8ad9f6)",description:"Komposisi minimal bernuansa langit dan pastel.",anime:"Original demo",image:null}
];
let items=load(),editing=-1;
function load(){try{const a=JSON.parse(localStorage.getItem(KEY));return Array.isArray(a)?a:structuredClone(defaultCatalog)}catch{return structuredClone(defaultCatalog)}}
function save(){localStorage.setItem(KEY,JSON.stringify(items));render()}
function $(id){return document.getElementById(id)}
function toast(m){$('status').textContent=m}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){
 $('count').textContent=items.length;
 $('entryList').innerHTML=items.map((w,i)=>`<div class="entry"><div class="entry-thumb">${w.image?`<img src="${safe(w.image)}" alt="">`:safe(w.symbol||'✦')}</div><div class="entry-meta"><strong>${safe(w.title)}</strong><small>${safe(w.category)} · ${safe(w.anime||w.mood||'')}</small></div><button class="admin-btn secondary" data-edit="${i}">Edit</button><button class="admin-btn danger" data-delete="${i}">Hapus</button></div>`).join('')||'<p class="file-note">Belum ada wallpaper. Tambahkan lewat form.</p>';
}
function clearForm(){editing=-1;$('wallForm').reset();$('symbol').value='影';$('bg').value='linear-gradient(155deg,#221447,#f45d9b)';$('formHeading').textContent='Tambah wallpaper';$('saveBtn').textContent='Simpan wallpaper';toast('')}
function formItem(){
 const title=$('title').value.trim();if(!title)throw new Error('Nama wallpaper wajib diisi.');
 const image=$('image').value.trim();
 return {title,anime:$('anime').value.trim()||'Anime',category:$('category').value,mood:$('mood').value.trim()||'Cinematic',symbol:$('symbol').value.trim()||'影',tag:$('tag').value.trim()||`${$('category').value.toUpperCase()} / ${items.length+1}`,bg:$('bg').value.trim()||'linear-gradient(155deg,#221447,#f45d9b)',colors:['#221447','#f45d9b'],orb:'linear-gradient(135deg,#f7ef78,#ff6db0)',description:$('description').value.trim()||`Wallpaper ${title}.`,image:image||null,filename:$('filename').value.trim()||undefined};
}
$('wallForm').addEventListener('submit',e=>{e.preventDefault();try{const w=formItem();if(editing>=0)items[editing]=w;else items.push(w);save();clearForm();toast('Wallpaper disimpan di browser ini. Ekspor JSON untuk menerapkannya ke website online.')}catch(err){toast(err.message)}});
$('clearForm').addEventListener('click',clearForm);
$('entryList').addEventListener('click',e=>{
 const ed=e.target.closest('[data-edit]');if(ed){editing=Number(ed.dataset.edit);const w=items[editing];for(const k of ['title','anime','category','mood','image','filename','symbol','tag','description','bg'])$(k).value=w[k]??'';$('formHeading').textContent='Edit wallpaper';$('saveBtn').textContent='Simpan perubahan';window.scrollTo({top:0,behavior:'smooth'});return}
 const del=e.target.closest('[data-delete]');if(del){const i=Number(del.dataset.delete);if(confirm(`Hapus "${items[i].title}" dari katalog lokal?`)){items.splice(i,1);save();toast('Entri dihapus dari katalog lokal.')}}});
$('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(items,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='wallpapers.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('File wallpapers.json diekspor. Unggah ke root repository untuk menerbitkan perubahan.')});
$('importBtn').addEventListener('click',()=>$('importFile').click());
$('importFile').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(!Array.isArray(d)||d.some(x=>!x||typeof x.title!=='string'))throw new Error('Format katalog tidak valid.');items=d;save();toast('Katalog berhasil diimpor ke browser.')}catch(err){toast('Gagal impor: '+err.message)}e.target.value=''});
$('restoreBtn').addEventListener('click',()=>{if(confirm('Pulihkan contoh demo? Katalog lokal sekarang akan diganti.')){items=structuredClone(defaultCatalog);save();clearForm();toast('Data demo dipulihkan.')}});
$('clearAllBtn').addEventListener('click',()=>{if(confirm('Hapus semua entri katalog lokal?')){items=[];save();clearForm();toast('Katalog lokal dikosongkan.')}});
render();