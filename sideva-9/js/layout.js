// js/layout.js

async function loadLayout() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');

    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (topbarContainer) topbarContainer.innerHTML = '';

    // 1. Ambil File Template Sidebar
    try {
        const sidebarResponse = await fetch('/components/sidebar.html');
        if (sidebarResponse.ok) {
            sidebarContainer.innerHTML = await sidebarResponse.text();
        }
    } catch (err) {
        console.error("Gagal memuat komponen sidebar:", err);
    }

    // 2. Ambil File Template Topbar
    try {
        const topbarResponse = await fetch('/components/topbar.html');
        if (topbarResponse.ok) {
            topbarContainer.innerHTML = await topbarResponse.text();
        }
    } catch (err) {
        console.error("Gagal memuat komponen topbar:", err);
    }

    // 3. Ambil Informasi Profil Log Masuk Pengguna
    try {
        const profile = await getProfile();
        if (profile) {
            const userName = document.getElementById('userName');
            if (userName) userName.innerText = profile.full_name;
            
            // === LOGIKA UTAMA: INJEKSI SELECTOR OPD GLOBAL (KHUSUS SUPER_ADMIN) ===
            if (profile.role === 'SUPER_ADMIN') {
                const container = document.getElementById('superAdminOpdSelectorContainer');
                const selector = document.getElementById('globalOpdSelector');

                if (container && selector) {
                    // Ambil daftar data OPD dari database Supabase Anda
                    const { data: opds, error } = await window.supabaseClient
                        .from('opds')
                        .select('id, name')
                        .order('name', { ascending: true });

                    if (!error && opds) {
                        // Susun daftar opsi pilihan
                        let optionsHtml = '<option value="ALL">-- Semua OPD (Konsolidasi) --</option>';
                        optionsHtml += opds.map(opd => 
                            `<option value="${opd.id}">${opd.name}</option>`
                        ).join('');
                        
                        selector.innerHTML = optionsHtml;

                        // Set ke nilai yang terakhir kali dipilih pengguna
                        const savedOpdId = localStorage.getItem('selected-opd-id') || 'ALL';
                        selector.value = savedOpdId;

                        // Pasang fungsi penangkap perubahan dropdown
                        selector.addEventListener('change', (e) => {
                            localStorage.setItem('selected-opd-id', e.target.value);
                            window.location.reload(); // Muat ulang halaman agar query data ter-refresh
                        });

                        // Tampilkan kontainer selector ke layar dengan melepas class d-none
                        container.classList.remove('d-none');
                    }
                }
            }

            // 4. Logika Menyembunyikan Menu Sidebar Berdasarkan Hak Akses Role
            const role = profile.role;
            const menuConfigs = {
                'ADMIN_OPD': ['menuOpds'],
                'PPTK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuHps'],
                'PPK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuBidangs', 'menuAccounts'],
                'PBJ': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuHps', 'menuBidangs', 'menuAccounts'],
                'VIEWER': ['menuUsers', 'menuOpds', 'menuAudit']
            };

            if (menuConfigs[role]) {
                menuConfigs[role].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = 'none';
                });
            }
        }
    } catch (profErr) {
        console.error("Gagal melakukan konfigurasi komponen profil pada layout:", profErr);
    }
}
window.loadLayout = loadLayout;

// Helper global untuk membaca data ter-filter di semua halaman
window.getActiveOpdIdForRead = function(profile) {
    if (!profile) return null;
    if (profile.role === 'SUPER_ADMIN') {
        const selected = localStorage.getItem('selected-opd-id') || 'ALL';
        return selected === 'ALL' ? null : selected;
    }
    return profile.opd_id;
}

// Helper global untuk menyimpan data pengadaan baru secara valid
window.getActiveOpdIdForWrite = function(profile) {
    if (!profile) return null;
    if (profile.role === 'SUPER_ADMIN') {
        const selected = localStorage.getItem('selected-opd-id') || 'ALL';
        if (selected === 'ALL') {
            alert("⚠️ AKSI DITOLAK!\nSilakan tentukan salah satu OPD spesifik pada bagian Topbar atas sebelum menambah atau memproses data.");
            return null;
        }
        return selected;
    }
    return profile.opd_id;
}

function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
}
window.toggleAppTheme = toggleAppTheme;
