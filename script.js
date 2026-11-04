(()=>{
  const img=document.getElementById('photo'), caption=document.getElementById('caption'), counter=document.getElementById('counter'), viewer=document.getElementById('viewer'), about=document.getElementById('aboutPanel'), prev=document.getElementById('prev'), next=document.getElementById('next'), menu=document.getElementById('mobileMenu'), mobile=document.getElementById('mobileNav');
  let section='music',index=0,touchX=null;
  const valid=['music','people','personal','about'];
  const itemAt=(list,i)=>typeof list[i]==='string'?{src:list[i],caption:''}:list[i];
  function active(s){document.querySelectorAll('[data-section]').forEach(a=>a.classList.toggle('active',a.dataset.section===s))}
  function preload(i){const l=PHOTOS[section];if(!l)return;const item=itemAt(l,(i+l.length)%l.length),p=new Image;p.src=item.src}
  function show(i,instant=false){const l=PHOTOS[section];index=(i+l.length)%l.length;const item=itemAt(l,index),p=new Image;p.onload=()=>{const swap=()=>{img.src=item.src;img.alt=item.caption||`${section} photograph ${index+1} of ${l.length}`;caption.textContent=item.caption||'';caption.hidden=!item.caption;counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(l.length).padStart(2,'0')}`;requestAnimationFrame(()=>img.classList.remove('fading'));preload(index+1);preload(index-1)};if(instant||!img.src)swap();else{img.classList.add('fading');setTimeout(swap,150)}};p.src=item.src}
  function open(s){active(s);mobile.hidden=true;mobile.classList.remove('open');if(s==='about'){viewer.hidden=true;about.hidden=false;return}about.hidden=true;viewer.hidden=false;section=s;index=0;show(0,true)}
  function route(){let s=location.hash.slice(1).toLowerCase();open(valid.includes(s)?s:'music')}
  prev.onclick=()=>show(index-1);next.onclick=()=>show(index+1);
  document.addEventListener('keydown',e=>{if(viewer.hidden)return;if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show(index+1)}});
  viewer.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
  viewer.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45)show(index+(dx<0?1:-1));touchX=null},{passive:true});
  menu.onclick=()=>{const o=!mobile.classList.contains('open');mobile.hidden=!o;mobile.classList.toggle('open',o)};
  window.addEventListener('hashchange',route);route();
})();
