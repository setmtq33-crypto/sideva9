async function loadLayout() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');

    if (sidebarContainer) {
        try {
            const res = await fetch('/components/sidebar.html');
            if (res.ok) sidebarContainer.innerHTML = await res.text();
        } catch (err) { console.error("Gagal memuat sidebar:", err); }
    }

    if (topbarContainer) {
        try {
            const res = await fetch('/components/topbar.html');
            if (res.ok) topbarContainer.innerHTML = await res.text();
        } catch (err) { console.error("Gagal memuat topbar:", err); }
    }

    const profile = await getProfile();
    if (profile) {
        const userName = document.getElementById('userName');
        if (userName) userName.innerText = profile.full_name;
        
        if (profile.role === 'SUPER_ADMIN') {
            const opdContainer = document.getElementById('globalOpdContainer');
            const opdSelect = document.getElementById('globalOpdSelect');
            
            if (opdContainer && opdSelect) {
                opdContainer.style.display = 'block';
                const { data } = await supabaseClient.from('opds').select('id, name').order('name');
                
                let savedOpdId = localStorage.getItem('global_opd_id');
                // Jika belum ada yang dipilih, pilih OPD urutan pertama sebagai default
                if (!savedOpdId && data && data.length > 0) {
                    savedOpdId = data[0].id;
                    localStorage.setItem('global_opd_id', savedOpdId);
                }

                if (data) {
                    opdSelect.innerHTML = data.map(o => 
                        `<option value="${o.id}" ${o.id === savedOpdId ? 'selected' : ''}>${o.name}</option>`
                    ).join('');
                }
            }
        } else {
            // Logika hide menu untuk role selain SUPER_ADMIN
            const menuConfigs = {

                ADMIN_OPD: [
                    'menuOpds',
                    'menuConfigs'
                ],
            
                PPTK: [
                    'menuUsers',
                    'menuOpds',
                    'menuConfigs',
                    'menuAccounts',
                    'menuBidangs',
                    'menuSipd'
                ],
            
                PPK: [
                    'menuUsers',
                    'menuOpds',
                    'menuConfigs',
                    'menuAccounts',
                    'menuBidangs',
                    'menuSipd',
                    
                ],
            
                PBJ: [
                    'menuUsers',
                    'menuOpds',
                    'menuConfigs',
                    'menuAccounts',
                    'menuBidangs',
                    'menuSipd'
                    'menuRup'
                ],
            
                VIEWER: [
                    'menuUsers',
                    'menuOpds',
                    'menuConfigs',
                    'menuAccounts',
                    'menuBidangs',
                    'menuSipd',
                    'menuRup'
                    'menuPackages'
                ]
            };

            const hiddenMenus = menuConfigs[profile.role] || [];
            hiddenMenus.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
        }
    }
}
window.loadLayout = loadLayout;

// Fungsi terpicu otomatis saat dropdown topbar diubah
window.handleGlobalOpdChange = function() {
    const opdSelect = document.getElementById('globalOpdSelect');
    if (opdSelect) {
        localStorage.setItem('global_opd_id', opdSelect.value);
        // Reload halaman untuk mereset seluruh kueri database berdasarkan OPD baru
        window.location.reload(); 
    }
}

// === FUNGSI KUNCI (Gunakan ini di SEMUA file .html Anda) ===
// Fungsi ini menentukan ID OPD mana yang sedang aktif saat ini
window.getActiveOpdId = function(profile) {
    if (!profile) return null;
    if (profile.role === 'SUPER_ADMIN') {
        return localStorage.getItem('global_opd_id');
    }
    return profile.opd_id; // Ambil dari asal instansi jika bukan Super Admin
}

function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
window.toggleAppTheme = toggleAppTheme;
