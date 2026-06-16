async function loadLayout() {
    // Cari kontainer
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');

    // Hanya eksekusi jika kontainer ditemukan di halaman tersebut
    if (sidebarContainer) {
        try {
            const sidebarResponse = await fetch('/components/sidebar.html');
            const sidebarHtml = await sidebarResponse.text();
            sidebarContainer.innerHTML = sidebarHtml;
        } catch (err) {
            console.error("Gagal memuat sidebar:", err);
        }
    }

    if (topbarContainer) {
        try {
            const topbarResponse = await fetch('/components/topbar.html');
            const topbarHtml = await topbarResponse.text();
            topbarContainer.innerHTML = topbarHtml;
        } catch (err) {
            console.error("Gagal memuat topbar:", err);
        }
    }

    // Update Nama User & Menu (tetap jalan)
    const profile = await getProfile();
    if (profile) {
        const userName = document.getElementById('userName');
        if (userName) userName.innerText = profile.full_name;
        
        // Logika akses menu (Jangan hide jika SUPER_ADMIN)
        if (profile.role !== 'SUPER_ADMIN') {
            const menuConfigs = {
                'ADMIN_OPD': ['menuOpds'],
                'PPTK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuHps'],
                'PPK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuBidangs', 'menuAccounts'],
                'PBJ': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuHps', 'menuBidangs', 'menuAccounts'],
                'VIEWER': ['menuUsers', 'menuOpds', 'menuAudit']
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

function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
window.toggleAppTheme = toggleAppTheme;

