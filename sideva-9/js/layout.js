// js/layout.js

async function loadLayout() {
    // 1. Bersihkan kontainer sebelum memuat ulang (Sesuai standard file Anda)
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');
    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (topbarContainer) topbarContainer.innerHTML = '';

    // 2. Fetch Sidebar
    try {
        const sidebarResponse = await fetch('/components/sidebar.html');
        const sidebarHtml = await sidebarResponse.text();
        if (sidebarContainer) sidebarContainer.innerHTML = sidebarHtml;
    } catch (err) {
        console.error("Gagal memuat sidebar:", err);
    }

    // 3. Fetch Topbar
    try {
        const topbarResponse = await fetch('/components/topbar.html');
        const topbarHtml = await topbarResponse.text();
        if (topbarContainer) topbarContainer.innerHTML = topbarHtml;
    } catch (err) {
        console.error("Gagal memuat topbar:", err);
    }

    // 4. Update Nama User & Logika Selector OPD Global
    const profile = await getProfile();
    if (profile) {
        const userName = document.getElementById('userName');
        if (userName) userName.innerText = profile.full_name;
        
        // === INTEGRASI AUTOMATIS SELECTOR OPD GLOBAL (KHUSUS SUPER_ADMIN) ===
        if (profile.role === 'SUPER_ADMIN') {
            const selectorContainer = document.getElementById('superAdminOpdSelectorContainer');
            const opdSelect = document.getElementById('globalOpdSelector');

            if (selectorContainer && opdSelect) {
                // Tampilkan container selector dengan menghapus class d-none bawaan topbar.html
                selectorContainer.classList.remove('d-none');

                try {
                    // Ambil data OPD aktif langsung dari database Supabase Anda
                    const { data: opds, error } = await window.supabaseClient
                        .from('opds')
                        .select('id, name')
                        .order('name');

                    if (!error && opds) {
                        // Ambil pilihan yang tersimpan di local storage (Sinkron dengan dashboard.html Anda)
                        let currentSelectedOpd = localStorage.getItem('selected-opd-id') || 'ALL';

                        // Buat daftar option, pertahankan default "-- Semua OPD (Konsolidasi) --"
                        let optionsHtml = `<option value="ALL" ${currentSelectedOpd === 'ALL' ? 'selected' : ''}>-- Semua OPD (Konsolidasi) --</option>`;
                        
                        optionsHtml += opds.map(o => 
                            `<option value="${o.id}" ${o.id === currentSelectedOpd ? 'selected' : ''}>${o.name}</option>`
                        ).join('');

                        opdSelect.innerHTML = optionsHtml;
                    }
                } catch (dbErr) {
                    console.error("Gagal memuat list OPD ke topbar selector:", dbErr);
                }

                // Handler ketika Super Admin mengubah pilihan OPD di Topbar
                opdSelect.addEventListener('change', function() {
                    localStorage.setItem('selected-opd-id', this.value);
                    window.location.reload(); // Refresh halaman instan agar seluruh query mengikuti OPD terpilih
                });
            }
        }

        // 5. Logika Hide Menu Berdasarkan Role (Sesuai file asli Anda)
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
}
window.loadLayout = loadLayout;

// =========================================================================
// UTILITY FUNCTIONS GLOBAL (Gunakan fungsi-fungsi ini di seluruh file Halaman Anda)
// =========================================================================

/**
 * 1. Ambil OPD Terpilih untuk Membaca/Menampilkan Data (Query SELECT)
 */
window.getActiveOpdIdForRead = function(profile) {
    if (!profile) return null;
    if (profile.role === 'SUPER_ADMIN') {
        const selected = localStorage.getItem('selected-opd-id') || 'ALL';
        return selected === 'ALL' ? null : selected; // Jika ALL, return null supaya query menampilkan semua data (Konsolidasi)
    }
    return profile.opd_id; // Jika admin lokal / role lain, kunci ke OPD asalnya sendiri
}

/**
 * 2. Ambil OPD Terpilih untuk Menyimpan/Menambah Data Baru (Query INSERT/UPDATE)
 */
window.getActiveOpdIdForWrite = function(profile) {
    if (!profile) return null;
    if (profile.role === 'SUPER_ADMIN') {
        const selected = localStorage.getItem('selected-opd-id') || 'ALL';
        if (selected === 'ALL') {
            alert("⚠️ AKSI DITOLAK!\nSilakan tentukan salah satu OPD spesifik pada bagian Topbar atas sebelum menambah atau memproses data.");
            return null; // Mencegah masuknya string 'ALL' ke kolom UUID di database yang menyebabkan crash
        }
        return selected;
    }
    return profile.opd_id;
}

/**
 * 3. Enforcer Keamanan URL (Route Guard)
 */
window.guardPage = function(profile, allowedRoles = []) {
    if (!profile) return false;
    if (!allowedRoles.includes(profile.role)) {
        alert("⛔ AKSES DITOLAK!\nAnda tidak memiliki otoritas resmi untuk mengakses menu manajemen halaman ini.");
        window.location.href = "/pages/dashboard.html";
        return false;
    }
    return true;
}

// 6. Theme Toggler (Sesuai basis management key 'theme-mode' di dashboard.html)
function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
}
window.toggleAppTheme = toggleAppTheme;
