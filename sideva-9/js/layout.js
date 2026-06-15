// layout.js — Meta AI Edition for SIDEVA9
// Tidak mengubah logika data, hanya tampilan sidebar/topbar/footbar
function loadLayout(){
  const wrapper = document.querySelector('.wrapper');
  if(!wrapper) return;

  // Hapus sidebar lama jika ada
  document.querySelectorAll('.sa-sidebar').forEach(el=>el.remove());

  // SIDEBAR
  const sidebar = document.createElement('aside');
  sidebar.className = 'sa-sidebar';
  sidebar.innerHTML = `
    <div class="sa-brand">
      <div class="sa-logo"><i class="bi bi-shield-check"></i></div>
      <div>
        <div class="sa-title">SIDEVA9</div>
        <div class="sa-sub">Procurement OS</div>
      </div>
      <button class="sa-pin d-none d-lg-inline" id="saPin" title="Pin sidebar"><i class="bi bi-layout-sidebar"></i></button>
    </div>
    <nav class="sa-nav">
      <a href="dashboard.html" data-link="dashboard"><i class="bi bi-speedometer2"></i><span>Dashboard</span></a>
      <a href="packages.html" data-link="packages"><i class="bi bi-box-seam"></i><span>Packages</span></a>
      <a href="package-items.html" data-link="items"><i class="bi bi-list-stars"></i><span>Items</span></a>
      <a href="price-surveys.html" data-link="surveys"><i class="bi bi-search"></i><span>Surveys</span></a>
      <a href="package-documents.html" data-link="docs"><i class="bi bi-file-earmark-text"></i><span>Documents</span></a>
      <a href="hps.html" data-link="hps"><i class="bi bi-calculator"></i><span>HPS Engine</span></a>
      <a href="procurement-ready.html" data-link="ready"><i class="bi bi-check2-circle"></i><span>Ready Proc</span><span class="sa-badge" id="saBadgeReady">0</span></a>
      <div class="sa-sep"></div>
      <a href="opds.html" data-link="opd"><i class="bi bi-building"></i><span>OPD</span></a>
      <a href="rup-import.html" data-link="rup"><i class="bi bi-cloud-upload"></i><span>Import RUP</span></a>
      <a href="audit-logs.html" data-link="audit"><i class="bi bi-journal-text"></i><span>Audit Logs</span></a>
      <a href="users.html" data-link="users"><i class="bi bi-people"></i><span>Users</span></a>
    </nav>
    <div class="sa-foot">
      <div class="sa-status"><span class="dot" id="saNetDot"></span><span id="saNetText">Online</span></div>
      <button class="sa-collapse d-lg-none" id="saClose"><i class="bi bi-x-lg"></i></button>
    </div>
  `;
  wrapper.prepend(sidebar);

  // TOPBAR
  const topbar = document.getElementById('topbar-container');
  if(topbar && !topbar.dataset.enhanced){
    topbar.dataset.enhanced = '1';
    topbar.classList.add('topbar-glass');
    topbar.innerHTML = `
      <div class="tb-left">
        <button class="tb-burger d-lg-none" id="tbBurger"><i class="bi bi-list"></i></button>
        <div class="tb-title"><i class="bi bi-grid-1x2 me-2"></i><span id="tbPage">Dashboard</span></div>
      </div>
      <div class="tb-right">
        <div class="tb-search"><i class="bi bi-search"></i><input id="tbSearch" placeholder="Cari di halaman..."></div>
        <button class="tb-icon" id="tbInstall" title="Install App"><i class="bi bi-download"></i></button>
        <div class="tb-user"><img id="tbAvatar" src="../img/avatar.png" alt=""><div><div id="tbName" class="tb-name">User</div><div id="tbRole" class="tb-role">—</div></div></div>
      </div>
    `;
  }

  // FOOTBAR
  const foot = document.getElementById('footbar-container');
  if(foot && !foot.dataset.enhanced){
    foot.dataset.enhanced = '1';
    foot.innerHTML = `
      <div class="sa-footer">
        <div>© 2026 SIDEVA9 • <span id="ftVersion">v9.0</span></div>
        <div class="ft-right">
          <span class="ft-dot" id="ftDot"></span><span id="ftNet">Online</span>
          <span class="sep">•</span>
          <a href="#" id="ftInstall">Install PWA</a>
        </div>
      </div>
    `;
  }

  // Aktifkan link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.sa-nav a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
    a.addEventListener('click', ()=> document.body.classList.remove('sa-open'));
  });
  const pageMap = { 'dashboard.html':'Dashboard','packages.html':'Packages','package-items.html':'Items','price-surveys.html':'Surveys','package-documents.html':'Documents','hps.html':'HPS Engine','procurement-ready.html':'Ready Proc','audit-logs.html':'Audit Logs','users.html':'Users','opds.html':'OPD','rup-import.html':'Import RUP' };
  document.getElementById('tbPage').textContent = pageMap[path] || 'SIDEVA9';

  // Burger
  document.getElementById('tbBurger')?.addEventListener('click', ()=> document.body.classList.toggle('sa-open'));
  document.getElementById('saClose')?.addEventListener('click', ()=> document.body.classList.remove('sa-open'));

  // Pin
  const pin = document.getElementById('saPin');
  const pinned = localStorage.getItem('sa-pinned')==='1';
  if(pinned) document.body.classList.add('sa-pinned');
  pin?.addEventListener('click', ()=>{ document.body.classList.toggle('sa-pinned'); localStorage.setItem('sa-pinned', document.body.classList.contains('sa-pinned')?'1':'0'); });

  // Network status
  const setNet = ()=>{ const on = navigator.onLine; ['saNetDot','saNetText','ftDot','ftNet'].forEach(id=>{ const el=document.getElementById(id); if(!el) return; if(id.includes('Dot')){ el.style.background = on?'#16a34a':'#dc2626'; } else { el.textContent = on?'Online':'Offline'; } }); };
  window.addEventListener('online', setNet); window.addEventListener('offline', setNet); setNet();

  // Badge Ready
  const syncBadge = ()=>{ const src=document.getElementById('readyProcurement'); const dst=document.getElementById('saBadgeReady'); if(src&&dst) dst.textContent = src.textContent.trim()||'0'; };
  const obs = new MutationObserver(syncBadge); const srcEl=document.getElementById('readyProcurement'); if(srcEl) obs.observe(srcEl,{childList:true,characterData:true,subtree:true}); setTimeout(syncBadge,800);

  // Topbar search (filter client)
  document.getElementById('tbSearch')?.addEventListener('input', e=>{ const q=e.target.value.toLowerCase(); document.querySelectorAll('table tbody tr').forEach(tr=>{ tr.style.display = tr.innerText.toLowerCase().includes(q)?'':'none'; }); });

  // Profile sync
  const syncProfile = ()=>{ const w=document.getElementById('welcomeText'); if(!w) return; const m=w.innerText.match(/Selamat datang (.+?) \((.+?)\)/); if(m){ document.getElementById('tbName').textContent=m[1]; document.getElementById('tbRole').textContent=m[2]; } };
  setTimeout(syncProfile,1000);

  // PWA install
  let deferred; const btns=[document.getElementById('tbInstall'), document.getElementById('ftInstall')];
  window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferred=e; btns.forEach(b=>b && (b.style.display='inline-flex')); });
  btns.forEach(b=> b && b.addEventListener('click', async e=>{ e.preventDefault(); if(deferred){ deferred.prompt(); deferred=null; btns.forEach(x=>x.style.display='none'); } }));
}

// Auto-load jika dipanggil dari halaman
if(typeof window!=='undefined'){ window.loadLayout = loadLayout; }
